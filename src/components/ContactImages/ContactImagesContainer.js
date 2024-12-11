import React, { useEffect, useMemo } from 'react'
import { View } from 'react-native'
import { ActivityIndicator, TextCopy } from '@components'
import { useModal, useUser } from '@context'
import ContactImagesView from './ContactImagesView'

const ContactImagesContainer = ({ list = false, ...props }) => {

    const { setModal } = useModal()
    const {
        userDetails,
        userDetailsLoading,
        initUserDetails,
    } = useUser()

    const images = useMemo(() => userDetails && userDetails.images, [userDetails])

    useEffect(() => {
        if (!userDetails || !userDetailsLoading) {
            initUserDetails(props.route.params?.username)
        }
    }, [])

    return (
        <View style={{ flex: 1 }}>

            {
                !images
                    ? (
                        <ActivityIndicator
                            size='medium'
                            label='Loading User Images...'
                            color='#fff'
                        />
                    )
                    : images.length
                        ? (
                            <ContactImagesView
                                images={images}
                                onPress={(type, data) => setModal(type, data)}
                                list={list}
                            />
                        )
                        : (
                            <TextCopy>
                                No images to show.
                            </TextCopy>
                        )
                }

            </View>
    )
}

export default ContactImagesContainer