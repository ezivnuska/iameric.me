import React, { useEffect, useMemo } from 'react'
import ContactsListView from './ContactsListView'
import { ActivityIndicator } from '@components'
import {
    // useContacts,
    useUser,
} from '@context'

const ContactsListContainer = props => {

    // const {
    //     contacts,
    //     contactsLoading,
    //     contactsLoaded,
    //     initContacts,
    //     setContact,
    // } = useContacts()

    const {
        initUsers,
        user,
        users,
        usersLoaded,
        usersLoading,
    } = useUser()

    // const otherUsers = useMemo(() => usersLoaded && users.filter(u => u._id !== user._id), [users, usersLoaded])

    useEffect(() => {
        // console.log('contacts screen')
        if (!usersLoaded && !usersLoading) initUsers()
        // return () => setContact(null)
    }, [])

    const onPress = username => props.navigation.navigate('User', { screen: 'Profile', params: { username } })

    return users?.length
        ? <ContactsListView contacts={users} onPress={onPress} />
        : <ActivityIndicator size='medium' />
}

export default ContactsListContainer