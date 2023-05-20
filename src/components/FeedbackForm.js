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

const FeedbackForm = ({ addEntry, updateStatus }) => {

    const {
        state,
        dispatch,
    } = useContext(AppContext)

    const { user } = state
    const [ entry, setEntry ] = useState('')

    const onChangeEntry = value => setEntry(value)

    const onSubmit = () => {
        const { username, _id } = user
        const newEntry = { username, userId: _id, text: entry }
        addEntry(newEntry)
        if (updateStatus) updateStatus('Sending...')
        axios
            .post('/api/entry', newEntry)
            .then(({ data }) => {
                updateStatus('Sent!')
                // dispatch({ type: 'NEW_ENTRY', entry: data.entry })
                setEntry('')
            })
            .catch(err => {
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
                style={[defaultStyles.button, (!entry.length ? defaultStyles.buttonDisabled : null)]}
                disabled={!entry.length}
                onPress={onSubmit}
            >
                <Text
                    style={[defaultStyles.buttonLabel, (!entry.length ? defaultStyles.buttonLabelDisabled : null)]}
                >
                    Say it
                </Text>
            </TouchableOpacity>

        </View>
    )
}

export default FeedbackForm

// const styles = StyleSheet.create({

// })