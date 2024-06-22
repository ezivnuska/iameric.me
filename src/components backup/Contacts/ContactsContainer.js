import React, { useEffect, useState } from 'react'
import {
    View,
} from 'react-native'
import {
    LoadingView,
} from '@components'
import {
    ContactListItem,
} from './components'
import {
    useContacts,
    useModal,
    useApp,
} from '@context'

export default () => {

    const {
        contacts,
        contactsLoading,
    } = useContacts()

    const { setModal } = useModal()
    const { profile } = useApp()

    if (contactsLoading) return <LoadingView loading='Loading contacts...' />

    return contacts && (
        <View>
            {contacts.map((contact) => {
                if (profile && profile._id === contact._id) return null
                return (
                    <ContactListItem
                        item={contact}
                        onPress={() => setModal('CONTACT', contact)}
                        key={`contact-${contact._id}`}
                    />
                )
            })}
        </View>
    )
}