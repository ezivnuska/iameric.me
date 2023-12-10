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

const FeedbackForm = () => {

    const {
        state,
        dispatch,
    } = useContext(AppContext)

    const { user } = state
    const [ entry, setEntry ] = useState('')

    const onChangeEntry = value => setEntry(value)

    const onSubmit = async () => {
        const { username, _id } = user
        const newEntry = { username, userId: _id, text: entry }
        
        const { data } = await axios.post('/api/entry', newEntry)
        
        if (!data) {
            console.log('Error saving entry.')
            return
        }
        
        dispatch({ type: 'NEW_ENTRY', entry: data.entry })
        setEntry('')
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