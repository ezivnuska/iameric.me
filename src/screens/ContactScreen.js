import React, { useEffect, useMemo, useState } from 'react'
import { Screen } from './components'
import { Contact } from '@modules'
import { useContacts } from '@contacts'
import { loadContact } from '@utils/contacts'
import { ActivityIndicator } from 'react-native-paper'

export default props => {

    const {
        getContact,
        updateContact,
    } = useContacts()

    const username = useMemo(() => props.route.params?.username, [props])

    const [contact, setContact] = useState(null)
    
    const fetchContact = async data => {
        const loadedContact = await loadContact(data)
        setContact(loadedContact)
        updateContact(loadedContact)
    }
    
    const checkOrFetchContact = async name => {
        const user = getContact(name)
        if (user) setContact(user)
        else await fetchContact(name)
    }

    useEffect(() => {
        if (username) {
            checkOrFetchContact(username)
        }
    }, [username])

    useEffect(() => {
        if (contact && contact.username !== username) {
            checkOrFetchContact(username)
        }
    }, [contact])

    return (
        <Screen {...props}>
            {contact && contact.username === username
                ? <Contact contact={contact} {...props} />
                : <ActivityIndicator size='large' />
            }
        </Screen>
    )
}