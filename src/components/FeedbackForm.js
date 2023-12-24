import React, { useContext, useEffect, useState } from 'react'
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
    // ButtonPrimary,
    FormButton,
    FormInput,
} from '.'

const FeedbackForm = ({ onComplete }) => {

    const {
        state,
        dispatch,
    } = useContext(AppContext)

    const { user } = state
    const [ entry, setEntry ] = useState('')
    const [ loading, setLoading ] = useState(false)

    const onChangeEntry = value => setEntry(value)
    
    const onSubmit = async () => {
        const { username, _id } = user
        const newEntry = { username, userId: _id, text: entry }
        
        setLoading(true)
        
        const { data } = await axios.post('/api/entry', newEntry)
        
        if (data) {
            dispatch({ type: 'NEW_ENTRY', entry: data.entry })
            setEntry('')
        } else console.log('Error submitting feedback')

        setLoading(false)
        
        onComplete()
    }

    const onEnter = e => {
        if (e.code === 'Enter') {
            if (entry.length) onSubmit()
            else onComplete()
        }
    }

    return (
        <View
            style={defaultStyles.form}
            onKeyPress={onEnter}
        >
            
            <FormInput
                label='Leave a comment'
                value={entry}
                onChangeText={onChangeEntry}
                placeholder='say something...'
                textContentType='none'
                autoCapitalize='sentences'
                keyboardType='default'
                style={defaultStyles.input}
                onKeyPress={onEnter}
            />

            <FormButton
                label='Send'
                dirty={entry.length}
                valid={entry.length}
                onClick={onSubmit}
                disabled={loading}
            />

        </View>
    )
}

export default FeedbackForm

// const styles = StyleSheet.create({

// })