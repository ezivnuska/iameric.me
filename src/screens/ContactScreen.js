import React, { useEffect, useState } from 'react'
import { Screen } from '@components'
import { Contact } from '@modules'
import { useContacts } from '@contacts'
import { loadContact } from '@utils/contacts'
import { ActivityIndicator } from 'react-native-paper'

export default props => {

    const {
        getContact,
        updateContact,
    } = useContacts()

    const { username } = props.route.params

    const [contact, setContact] = useState(null)
    
    const fetchContact = async data => {
        const loadedContact = await loadContact(data)
        setContact(loadedContact)
        updateContact(loadedContact)
    }

    useEffect(() => {
        if (!username) setContact(null)
        else {
            if (!contact || contact.username !== username) {
                const user = getContact(username)
                if (user) setContact(user)
                else fetchContact(username)
            }
        }
    }, [username])

    return (
        <Screen {...props}>
            {contact
                ? <Contact contact={contact} {...props} />
                : <ActivityIndicator size='large' />
            }
        </Screen>
    )
}