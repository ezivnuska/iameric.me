import React, { useEffect } from 'react'
import {
    View,
} from 'react-native'
import {
    LoadingView,
    UserList,
    EmptyStatus,
} from '.'
import {
    useApp,
    useContacts,
} from '@context'
import {
    loadUsers,
} from '@utils/contacts'
import { navigationRef } from 'src/navigation/RootNavigation'

export default () => {
    
    const { isLandscape } = useApp()
    const {
        contact,
        contacts,
        contactsLoading,
        setContact,
        setContacts,
        setContactsLoading,
    } = useContacts()
    
    useEffect(() => {
        const init = async () => {
            setContactsLoading(true)
            const { data } = await loadUsers()
            setContactsLoading(false)
            console.log('data-------------', data)
            if (data && data.users) setContacts(data.users)
        }
        init()
    }, [])

    useEffect(() => {
        if (contact) navigationRef.navigate('User')
    }, [contact])

    if (contactsLoading) return <LoadingView loading='Loading contacts' />

    return contacts.length
        ? (
            <View
                style={{
                    flex: 1,
                    flexGrow: 1,
                }}
            >
                <UserList
                    horizontal={isLandscape}
                    items={contacts}
                    onPress={setContact}
                />
            </View>
        )
        : <EmptyStatus status='No users to display.' />
}