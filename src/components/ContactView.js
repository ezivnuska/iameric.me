import React, { useContext, useEffect } from 'react'
import { FlatList } from 'react-native'
import {
    ContactList,
    ThemedText,
} from '@components'
import axios from 'axios'
import { useContacts } from '@context'

export default () => {

    const { setContacts, setLoadingContacts } = useContacts()

    useEffect(() => {
        const init = async () => {
            setLoadingContacts(true)
            const { data } = await axios.get('/api/users')
        
            if (data && data.users) {
                setContacts(data.users)
            }
            
            setLoadingContacts(false)
        }
        init()
    }, [])

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