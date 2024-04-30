import React, { useEffect, useState } from 'react'
import {
    View,
} from 'react-native'
import {
    LoadingView,
    EmptyStatus,
    ImageList,
} from '@components'
import {
    useApp,
    useContacts,
    useModal,
    useUser,
} from '@context'
import { getContactImages } from '@utils/contacts'

export default ({ user }) => {
    
    const { dims } = useApp()
    const {
        contactLoading,
        contacts,
        setContactLoading,
        updateContact,
    } = useContacts()
    const { setModal } = useModal()
    const { profile } = useUser()

    const [contact, setContact] = useState(null)

    useEffect(() => {
        const fetchContactImages = async () => {
            setContactLoading(true)
            const images = await getContactImages(user._id)
            setContactLoading(false)
            
            if (!images) console.log('Error loading images for contact')
            else {
                const updatedContact = { ...user, images }
                setContact(updatedContact)
                updateContact(updatedContact)
            }
        }
        if (!user.images) fetchContactImages()
    }, [])

    if (contactLoading) return <LoadingView loading='Loading contact' />

    return contact && contact.images && contact.images.length ? (
        <View
            style={{
                width: '100%',
                maxWidth: dims.width - 20,
            }}
        >
            <ImageList
                images={contact.images}
                onSelected={image => setModal('IMAGE', image)}
                restricted={profile._id !== contact._id}
            />

        </View>
    ) : <EmptyStatus status='No images yet.' />
}