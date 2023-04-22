import React, { useContext, useState } from 'react'
import {
    // StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View
} from 'react-native'
import axios from 'axios'
import { AppContext } from '../AppContext'
import defaultStyles from '../styles'

const FeedbackForm = ({ updateStatus }) => {

    const {
        state,
        dispatch,
    } = useContext(AppContext)

    const { user } = state
    const [ entry, setEntry ] = useState('')
    const [loading, setLoading] = useState(false)

    const onChangeEntry = value => setEntry(value)

    const onSubmit = () => {
        const { username, _id } = user
        const newEntry = { username, userId: _id, text: entry }
        setLoading(true)
        updateStatus('Sending...')
        axios
            .post('/api/entry', newEntry)
            .then(({ data }) => {
                setLoading(false)
                updateStatus('Sent!')
                dispatch({ type: 'NEW_ENTRY', entry: data.entry })
                setEntry('')
            })
            .catch(err => {
                setLoading(false)
                updateStatus('Error saving entry.')
                console.log('Error saving entry', err)
            })
    }

    return (
        <View style={defaultStyles.form}>
            
            <TextInput
                style={defaultStyles.input}
                onChangeText={onChangeEntry}
                value={entry}
                placeholder='say something...'
                textContentType='none'
                autoCapitalize='sentences'
                keyboardType='default'
            />

            <TouchableOpacity
                style={[defaultStyles.button, (loading ? defaultStyles.buttonDisabled : null)]}
                disabled={loading}
                onPress={onSubmit}
            >
                <Text
                    style={[defaultStyles.buttonLabel, (loading ? defaultStyles.buttonLabelDisabled : null)]}
                >
                    {loading ? 'Sending...' : 'Say it'}
                </Text>
            </TouchableOpacity>

        </View>
    )
}

export default FeedbackForm

// const styles = StyleSheet.create({

// })