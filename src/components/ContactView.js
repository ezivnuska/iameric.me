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

export default () => {
    
    const { dims } = useApp()
    const {
        contact,
        contactLoading,
        setContact,
        setContactLoading,
    } = useContacts()

    const { setModal, data } = useModal()

    useEffect(() => {
        if (!contact) init()
    }, [])

    const init = async () => {
        setContactLoading(true)
        const user = await loadFullContact(data._id)
        if (!user) console.log('Error loading user')
        else setContact(user)
        setContactLoading(false)
    }

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
            />

        </View>
    ) : <EmptyStatus status='No images yet.' />
}