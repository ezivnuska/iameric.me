import React, { useContext, useState } from 'react'
import {
    View
} from 'react-native'
import {
    FormInput,
    IconButton,
} from '.'
import axios from 'axios'
import { AppContext } from '@context'
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
        
        dispatch({ type: 'SET_LOADING', payload: 'Submitting feedback...' })
        
        const { data } = await axios.post('/api/entry', newEntry)
        
        if (data) {
            setEntry('')
            dispatch({ type: 'ADD_ENTRY', payload: data.entry })
        } else console.log('Error submitting feedback')

        dispatch({ type: 'SET_LOADING', payload: null })

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
            style={[
                classes.formContainer,
                {
                    justifyContent: 'center',
                    flexBasis: 'auto',
                },
        ]}
            // onKeyPress={onEnter}
        >
            
            <FormInput
                value={entry}
                onChange={onChangeEntry}
                placeholder='say something...'
                textContentType='none'
                autoCapitalize='sentences'
                keyboardType='default'
                // onKeyPress={onEnter}
                autoFocus
                multiline
                style={{
                    flexBasis: 'auto',
                    flexWrap: 'wrap',
                    flexGrow: 0,
                    maxHeight: 300,
                }}
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