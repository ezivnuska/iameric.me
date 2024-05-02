import React, { useEffect, useState } from 'react'
import {
    View,
} from 'react-native'
import {
    LoadingView,
    EmptyStatus,
    ImageList,
    ThemedText,
} from '@components'
import {
    useApp,
    useContacts,
    useModal,
    useUser,
} from '@context'
import {
    loadFullContact,
} from '@utils/contacts'

export default ({ userId }) => {
    
    const { dims } = useApp()
    const {
        contactLoading,
        setContactLoading,
        updateContact,
    } = useContacts()
    const { setModal } = useModal()

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
        fetchContact()
    }, [])

    if (contactLoading) return <LoadingView loading='Loading contact' />

    return contact && (
        <View
            style={{
                width: '100%',
                maxWidth: dims.width - 20,
            }}
        >   
            <ThemedText>{contact.username}</ThemedText>

            {contact.images.length ? (
                <ImageList
                    images={contact.images}
                    onSelected={image => setModal('IMAGE', image)}
                    restricted={true}
                    // restricted={profile._id !== contact._id}
                />
            ) : <EmptyStatus status='No images yet.' />}

        </View>
    )
}