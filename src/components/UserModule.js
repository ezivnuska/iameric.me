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
} from '@utils/data'
import { navigationRef } from 'src/navigation/RootNavigation'

export default () => {
    
    const { isLandscape } = useApp()
    const {
        contacts,
        contactsLoading,
        setContacts,
        setContactsLoading,
    } = useContacts()
    
    useEffect(() => {
        const init = async () => {
            setContactsLoading(true)
            const { data } = await loadUsers()
            setContactsLoading(false)
            if (data && data.users) setContacts(data.users)
        }
        init()
    }, [])

    if (contactsLoading) return <LoadingView />

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
                    onPress={contact => {
                        navigationRef.navigate('User', { id: contact._id })
                    }}
                />
            </View>
        )
        : <EmptyStatus status='No users to display.' />
}