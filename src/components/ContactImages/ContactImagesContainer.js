import React, { useEffect, useMemo } from 'react'
import { View } from 'react-native'
import { ActivityIndicator, DefaultText, ImageList } from '@components'
import { useContacts, useModal } from '@context'
import ContactImagesView from './ContactImagesView'

const ContactImagesContainer = ({ list = false, ...props }) => {

    const {
        contact,
        contactLoaded,
        contactLoading,
        // contactImagesLoaded,
        contactImagesLoading,
        initContact,
        // setContactModal,
    } = useContacts()

    const { setModal } = useModal()

    const images = useMemo(() => contact && contact.images, [contact])

    useEffect(() => {
        if (!contact || !contactLoaded && !contactLoading) {
            initContact(props.route.params?.username)
        }
    }, [])

    return (
        <View style={{ flex: 1 }}>

            {
                contactImagesLoading
                    ? (
                        <ActivityIndicator
                            size='medium'
                            label='Loading Contact Images...'
                            color='#fff'
                        />
                    )
                    : images?.length
                        ? (
                            <ContactImagesView
                                images={images}
                                onPress={(type, data) => setModal(type, data)}
                                list={list}
                            />
                        )
                        : (
                            <DefaultText>
                                No images to show.
                            </DefaultText>
                        )
                }

            </View>
    )
}

export default ContactImagesContainer