import React, { useContext, useState } from 'react'
import {
    View
} from 'react-native'
import {
    FormInput,
    IconButton,
} from '.'
import axios from 'axios'
import { AppContext } from '../AppContext'
import classes from '../styles/classes'

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
            style={classes.formContainer}
            onKeyPress={onEnter}
        >
            
            <FormInput
                value={entry}
                onChangeText={onChangeEntry}
                placeholder='say something...'
                textContentType='none'
                autoCapitalize='sentences'
                keyboardType='default'
                onKeyPress={onEnter}
                // autoFocus
            />

            <IconButton
                type='primary'
                label='Send'
                disabled={!entry.length || loading}
                onPress={onSubmit}
            />

        </View>
    )
}