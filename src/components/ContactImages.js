import React, { useEffect, useMemo } from 'react'
import { View } from 'react-native'
import { ActivityIndicator, ImageList } from '@components'
import { useContacts } from '@contacts'

const ContactImages = props => {

    const {
        contact,
        contactLoaded,
        contactLoading,
        contacts,
        contactsLoaded,
        contactsLoading,
        contactImagesLoaded,
        contactImagesLoading,
        initContact,
        initContacts,
        getContact,
        setContactModal,
    } = useContacts()

    const profile = useMemo(() => contact && getContact(contact.username), [contact])
    const contactImages = useMemo(() => profile && profile.images, [profile])

    useEffect(() => {
        if (!profile && !contactLoaded && !contactLoading) {
            initContact(props.route.params.username)
        }
    }, [])

    // useEffect(() => {
    //     if (!contactsLoaded && !contactsLoading) {
    //         console.log('loading contacts from ContactImages', contacts)
    //         initContacts()
    //     }
    // }, [contacts])

    return (
        <View style={{ flex: 1 }}>

            {contactImagesLoaded ? (
                <ImageList
                    images={contactImages}
                    onPress={(type, data) => setContactModal(type, data)}
                />
            ) : (
                <ActivityIndicator
                    size='medium'
                    label='Loading Contact Images...'
                    color='#fff'
                />
            )}
        </View>
    )
}

export default ContactImages