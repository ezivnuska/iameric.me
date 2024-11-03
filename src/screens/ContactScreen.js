import React, { useEffect, useMemo, useState } from 'react'
import { Screen } from './components'
import { Contact } from '@modules'
import { useContacts } from '@contacts'
import { loadContact } from '@utils/contacts'
import { ActivityIndicator } from 'react-native-paper'

export default props => {

    const { username } = props.route.params

    const {
        getContact,
        updateContact,
    } = useContacts()

    const [contact, setContact] = useState(null)

    const userDetails = useMemo(() => getContact(username), [username])
    
    const fetchContact = async data => {
        const loadedContact = await loadContact(data)
        setContact(loadedContact)
        updateContact(loadedContact)
    }
    
    const checkOrFetchContact = async () => {
        if (userDetails) setContact(userDetails)
        else await fetchContact(username)
    }

    useEffect(() => {
        if (username) checkOrFetchContact()
    }, [username])

    return (
        <Screen secure {...props}>
            {contact
                ? <Contact contact={contact} key={Date.now()} />
                : <ActivityIndicator size='small' />
            }
        </Screen>
    )
}