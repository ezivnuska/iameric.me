import React, { useContext, useState } from 'react'
import {
    View
} from 'react-native'
import {
    FormInput,
    IconButton,
} from '.'
import axios from 'axios'
import { AppContext, useForum, useModal, useUser } from '@context'
import classes from '../styles/classes'

export default () => {

    const {
        loading,
    } = useContext(AppContext)

    const { profile } = useUser()
    const { addEntry } = useForum()
    const { closeModal } = useModal()
    const [ entry, setEntry ] = useState('')

    const onChangeEntry = value => setEntry(value)
    
    const onSubmit = async () => {
        const { username, _id } = profile
        const newEntry = { user: _id, text: entry }
        
        const { data } = await axios.post('/api/entry', newEntry)
        
        if (data) {
            setEntry('')
            addEntry(data.entry)
        } else console.log('Error submitting feedback')

        closeModal()
    }

    // const onEnter = e => {
    //     if (e.code === 'Enter') {
    //         if (entry.length) onSubmit()
    //         else onComplete()
    //     }
    // }

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