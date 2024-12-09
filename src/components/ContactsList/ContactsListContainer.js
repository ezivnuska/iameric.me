import React, { useEffect, useMemo } from 'react'
import ContactsListView from './ContactsListView'
import { ActivityIndicator } from '@components'
import { useContacts, useUser } from '@context'

const ContactsListContainer = props => {

    const {
        contacts,
        contactsLoading,
        contactsLoaded,
        initContacts,
        setContact,
    } = useContacts()

    const { user } = useUser()

    const otherUsers = useMemo(() => contactsLoaded && contacts.filter(c => c._id !== user._id), [contacts, contactsLoaded])

    useEffect(() => {
        // console.log('contacts screen')
        if (!contactsLoaded && !contactsLoading) initContacts()
        // return () => setContact(null)
    }, [])

    const onPress = username => props.navigation.navigate('Contact', { username })

    return otherUsers?.length
        ? <ContactsListView contacts={otherUsers} onPress={onPress} />
        : <ActivityIndicator size='medium' />
}

export default ContactsListContainer