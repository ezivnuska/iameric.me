import React, { useEffect, useMemo } from 'react'
import {
    View,
} from 'react-native'
import {
    LoadingView,
    EmptyStatus,
    ImageList,
} from '@components'
import {
    Screen,
    ScreenTitle,
} from '.'
import {
    useContacts,
    useModal,
} from '@context'
import { loadContact, getContactImages } from '@utils/contacts'

export default ({ navigation }) => {
    
    const {
        contact,
        contactLoading,
        setContact,
        setContactsLoading,
        updateContact,
    } = useContacts()
    const { setModal } = useModal()

    // const contactId = useMemo(() => contact._id, [contact])

    useEffect(() => {
        console.log('screen init-->contact', contact)
        // init()
    }, [])

    // useEffect(() => {
    //     console.log('contactId', contactId)
    //     // init()
    // }, [contactId])
    
    // useEffect(() => {
    //     console.log('contact change', contact)
    //     if (lastContact && contact._id !== lastContact._id) {
    //         init()
    //     }
    // }, [contact])

    // const init = async () => {
    //     if (contact) {
    //         let user = contact
    //         setContactsLoading(true)
    //         const response = await loadContact(user._id)
    //         setContactsLoading(false)
    //         if (!response || !response.user) {
    //             console.log('Error loading user')
    //         } else {
    //             const loadedImages = await getContactImages(response.user._id)
    //             user = {
    //                 ...user,
    //                 ...response.user,
    //             }
    //             if (loadedImages) {
    //                 user = {
    //                     ...user,
    //                     images: loadedImages,
    //                 }
    //             }
    //         }
    //         setContact(user)
    //         updateContact(user)
    //     }
    // }

    if (contactLoading) return <LoadingView loading='Loading contact' />

    return contact ? (
        <Screen
            titleComponent={
                <ScreenTitle
                    backLabel='Users'
                    title={contact.username}
                    navigation={navigation}
                />
            }
        >
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
            
        </Screen>
    ) : null
}