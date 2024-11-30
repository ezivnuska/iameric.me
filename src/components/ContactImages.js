import React, { useEffect, useMemo } from 'react'
import { View } from 'react-native'
import { ActivityIndicator, ImageGrid } from '@components'
import { useContacts } from '@contacts'

const ContactImages = ({ list = false, ...props }) => {

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

    return (
        <View style={{ flex: 1 }}>

            {!contactImagesLoaded
                ? (
                    <ActivityIndicator
                        size='medium'
                        label='Loading Contact Images...'
                        color='#fff'
                    />
                )
                : (
                    <ImageGrid
                        images={contactImages}
                        onPress={(type, data) => setContactModal(type, data)}
                        list={list}
                    />
                )}
            </View>
    )
}

export default ContactImages