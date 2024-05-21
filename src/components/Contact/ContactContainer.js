import React, { useEffect, useMemo } from 'react'
import {
    View,
} from 'react-native'
import {
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

    const contact = useMemo(() => contacts.filter(user => user._id === userId)[0], [contacts, userId])
    const images = useMemo(() => contact.images, [contact])

    useEffect(() => {

        const initContacts = async () => {
            await loadContacts()
        }
        
        if (!contactsLoaded) initContacts()
    }, [contactsLoaded])

    useEffect(() => {
        const fetchContact = async () => {
            setContactsLoading(true)
            const user = await loadFullContact(userId)
            setContactsLoading(false)

            if (!user) console.log('Error loading contact details')
            else updateContact(user)
        }
        if (!contact.images) fetchContact()
    }, [contact])

    if (contactsLoading) return <LoadingView loading='Loading contact' />

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

            {images && <ImageList images={images} />}

        </View>
    )
}