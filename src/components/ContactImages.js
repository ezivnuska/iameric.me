import React, { useEffect, useMemo } from 'react'
import { View } from 'react-native'
import { ActivityIndicator, DefaultText, ImageList } from '@components'
import { useContacts } from '@contacts'

const ContactImages = ({ list = false, ...props }) => {

    const {
        contact,
        contactLoaded,
        contactLoading,
        // contactImagesLoaded,
        contactImagesLoading,
        initContact,
        setContactModal,
    } = useContacts()

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
                    : contact
                        ? contact.images?.length
                            ? (
                                <ImageList
                                    images={contact.images}
                                    onPress={(type, data) => setContactModal(type, data)}
                                    list={list}
                                />
                            )
                            : (
                                <DefaultText>
                                    No images to show.
                                </DefaultText>
                            )
                        : null
                }

            </View>
    )
}

export default ContactImages