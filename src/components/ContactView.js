import React, { useContext, useEffect } from 'react'
import { FlatList } from 'react-native'
import {
    ContactList,
    ThemedText,
} from '@components'
import axios from 'axios'
import { ContactContext } from '../context/ContactContext'

export default () => {

    const {
        state,
        dispatch,
    } = useContext(ContactContext)

    useEffect(() => {
        if (!state.loaded) init()
    }, [])

    const init = async () => {
        dispatch({ type: 'LOADING_CONTACTS', payload: true })
        const { data } = await axios.get('/api/users')
    
        if (data && data.users) {
            dispatch({ type: 'SET_USERS', payload: data.users })
        }
        
        dispatch({ type: 'LOADING_CONTACTS', payload: false })
        dispatch({ type: 'CONTACTS_LOADED', payload: true })
    }

    return (
        <ContactList />
    )
    
    // return (
    //     <FlatList
    //         data={state.contacts}
    //         keyExtractor={(contact, index) => `${index}-${contact.username}`}
    //         renderItem={({ item }) => <ThemedText>{item.username}</ThemedText>}
    //     />
    // )
}