import React, { useEffect, useMemo, useState } from 'react'
import {
    View,
} from 'react-native'
import {
    EmptyStatus,
    LoadingView,
    ThemedText,
} from '@components'
import {
    ImageList,
} from './components'
import {
    useApp,
    useContacts,
} from '@context'
import {
    loadContacts,
    loadFullContact,
} from '@utils/contacts'
import { classes } from '@styles'

export default ({ userId }) => {
    
    const { dims } = useApp()
    const {
        contacts,
        contactsLoaded,
        contactsLoading,
        setContactsLoading,
        updateContact,
    } = useContacts()


    const [contact, setContact] = useState(null)

    useEffect(() => {
        const initContacts = async () => await loadContacts()
        if (!contactsLoaded && !contactsLoading) initContacts()
    }, [contactsLoaded])

    useEffect(() => {
        const fetchContact = async () => {
            setContactsLoading(true)
            const user = await loadFullContact(userId)
            setContactsLoading(false)
            console.log('full user', user)
            if (user) {
                setContact(user)
                updateContact(user)
            } else console.log('Error loading contact details')
        }
        fetchContact()
    }, [])

    return contact && (
        <View
            style={{
                width: '100%',
                maxWidth: dims.width - 20,
                paddingVertical: 10,
                marginHorizontal: 10,
            }}
        >   
            <ThemedText
                style={[
                    classes.pageTitle,
                    { marginBottom: 10 },
                ]}
            >
                {contact.username}
            </ThemedText>

            <ThemedText>{`Deposit: ${Number(contact.deposit || 0).toFixed(2)}`}</ThemedText>

            {(contact.images && contact.images.length)
                ? <ImageList images={contact.images} />
                : contactsLoading
                    ? <EmptyStatus status='No images yet.' />
                    : <LoadingView loading='Loading contact' />
            }

        </View>
    )
}