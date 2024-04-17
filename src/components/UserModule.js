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
    useContacts,
    useModal,
} from '@context'
import {
    loadUsers,
} from '@utils/contacts'

export default () => {

    const {
        contacts,
        contactsLoading,
        setContacts,
        setContactsLoading,
    } = useContacts()
    const { setModal } = useModal()

    useEffect(() => {
        const init = async () => {
            setContactsLoading(true)
            const { data } = await loadUsers()
            setContactsLoading(false)
            if (data && data.users) setContacts(data.users)
        }
        init()
    }, [])

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
                    items={contacts}
                    onPress={user => setModal('CONTACT', user)}
                />
            </View>
        )
        : <EmptyStatus status='No users to display.' />
}