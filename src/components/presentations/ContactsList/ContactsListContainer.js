import React, { useEffect } from 'react'
import ContactsListView from './ContactsListView'
import { ActivityIndicator } from '@components'
import { useUser } from '@context'

const ContactsListContainer = props => {

    const {
        initUsers,
        user,
        users,
        usersLoaded,
        usersLoading,
    } = useUser()

    useEffect(() => {
        if (!usersLoaded && !usersLoading) initUsers()
    }, [])

    const onPress = username => props.navigation.navigate('User', { screen: 'Profile', params: { username } })

    return users?.length
        ? <ContactsListView contacts={users} onPress={onPress} />
        : <ActivityIndicator size='medium' />
}

export default ContactsListContainer