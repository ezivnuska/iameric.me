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
        loading,
    } = useContext(AppContext)

    const { user } = state
    const [ entry, setEntry ] = useState('')

    const onChangeEntry = value => setEntry(value)
    
    const onSubmit = async () => {
        const { username, _id } = user
        const newEntry = { user: _id, text: entry }
        
        dispatch({ type: 'SET_LOADING', loading: 'Submitting feedback...' })
        
        const { data } = await axios.post('/api/entry', newEntry)
        
        if (data) {
            setEntry('')
            dispatch({ type: 'NEW_ENTRY', entry: data.entry })
        } else console.log('Error submitting feedback')

        dispatch({ type: 'SET_LOADING', loading: null })

        dispatch({ type: 'CLOSE_MODAL' })
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
                autoFocus
                multiline
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