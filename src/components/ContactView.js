import React, { useEffect, useState } from 'react'
import {
    View,
} from 'react-native'
import {
    CenterVertical,
    LoadingView,
    EmptyStatus,
    ImageList,
    ThemedText,
} from '@components'
import {
    useApp,
    useContacts,
} from '@context'
import {
    loadFullContact,
} from '@utils/contacts'
import classes from '@styles/classes'

export default ({ userId }) => {
    
    const { dims } = useApp()
    const {
        contactLoading,
        setContactLoading,
        updateContact,
    } = useContacts()

    const [contact, setContact] = useState(null)

    useEffect(() => {
        const fetchContact = async () => {
            setContactLoading(true)
            const user = await loadFullContact(userId)
            setContactLoading(false)

            if (!user) console.log('Error loading contact details')
            else {
                setContact(user)
                updateContact(user)
            }
        }
        if (userId) fetchContact()
    }, [userId])

    if (contactLoading) return <LoadingView loading='Loading contact' />

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

            {contact.images.length ? (
                <ImageList
                    images={contact.images}
                    restricted={true}
                    // restricted={profile._id !== contact._id}
                />
            ) : <EmptyStatus status='No images yet.' />}

        </View>
    )
}