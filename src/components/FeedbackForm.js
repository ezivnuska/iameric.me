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
import defaultStyles from '../styles/main'
import {
    ButtonPrimary,
    FormInput,
} from '.'

const FeedbackForm = ({ addEntry }) => {

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
        
        axios
            .post('/api/entry', newEntry)
            .then(({ data }) => {
                setEntry('')
            })
            .catch(err => {
                console.log('Error saving entry', err)
            })
    }

    return (
        <View style={defaultStyles.form}>
            
            <FormInput
                label='Leave a comment'
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