import React from 'react'
import { View } from 'react-native'
import { LoadingView } from '@components'
import { ContactListItem } from './components'
import { useApp } from '@app'
import { useContacts } from '@contacts'
import { useModal } from '@modal'

export default () => {

    const { user } = useApp()
    const {
        contacts,
        contactsLoading,
    } = useContacts()
    const {
        setModal,
    } = useModal()

    if (contactsLoading) return <LoadingView loading='Loading contacts...' />

    return (
        <View>
            {contacts.map((contact, index) => {
                if (user && user._id === contact._id) return null
                return (
                    <ContactListItem
                        item={contact}
                        onPress={() => setModal('MESSAGE', contact)}
                        key={`contact-${index}`}
                    />
                )
            })}
        </View>
    )
}