import React, { useContext, useState } from 'react'
import {
    View
} from 'react-native'
import axios from 'axios'
import { AppContext } from '../AppContext'
import defaultStyles from '../styles/main'
import {
    FormInput,
    IconButton,
} from '.'

export default () => {

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
        const newEntry = { user: _id, text: entry }
        
        setLoading(true)
        
        const { data } = await axios.post('/api/entry', newEntry)
        
        if (data) {
            dispatch({ type: 'NEW_ENTRY', entry: data.entry })
            setEntry('')
        } else console.log('Error submitting feedback')

        setLoading(false)
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
                value={entry}
                onChangeText={onChangeEntry}
                placeholder='say something...'
                textContentType='none'
                autoCapitalize='sentences'
                keyboardType='default'
                style={defaultStyles.input}
                onKeyPress={onEnter}
                autoFocus
            />

            <IconButton
                label='Send'
                bgColor={entry.length ? 'blue' : 'gray'}
                disabled={!entry.length || loading}
                onPress={onSubmit}
            />

        </View>
    )
}