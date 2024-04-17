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
    useContacts,
    useModal,
} from '@context'
import { loadFullContact } from '@utils/contacts'

export default () => {
    
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

    return contact ? (
        <View>
            {contact.images && contact.images.length ? (
                <View
                    style={{ marginHorizontal: 10 }}
                >
                    <ImageList
                        images={contact.images}
                        onSelected={image => setModal('IMAGE', image)}
                    />

                </View>
            ) : <EmptyStatus status='No images yet.' />}
            
        </View>
    ) : null
}