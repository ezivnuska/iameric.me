import React, { useEffect } from 'react'
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
} from '@context'
import { loadFullContact } from '@utils/contacts'

export default ({ user }) => {
    
    const { dims } = useApp()
    const {
        contact,
        contactLoading,
        setContact,
        setContactLoading,
        setContactModal,
    } = useContacts()

    useEffect(() => {
        console.log('user', user)
        const init = async () => {
            setContactLoading(true)
            const loadedUser = await loadFullContact(user._id)
            setContactLoading(false)
            if (!loadedUser) console.log('Error loading user')
            else setContact(loadedUser)
        }
        if (!contact) init()
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
                onSelected={image => setContactModal('IMAGE', image)}
            />

        </View>
    ) : <EmptyStatus status='No images yet.' />
}