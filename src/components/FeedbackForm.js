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
import {
    ButtonPrimary,
    FormInput,
} from '.'

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
            
            <FormInput
                label='Feedback'
                value={entry}
                onChangeText={onChangeEntry}
                placeholder='say something...'
                textContentType='none'
                autoCapitalize='sentences'
                keyboardType='default'
                style={defaultStyles.input}
            />

            <ButtonPrimary
                label='Send'
                disabled={!entry.length}
                onPress={onSubmit}
            />

        </View>
    )
}

export default FeedbackForm

// const styles = StyleSheet.create({

// })