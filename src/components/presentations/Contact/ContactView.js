import React from 'react'
import { Pressable, View } from 'react-native'
import { ProfileImage } from '@components'

const PROFILE_IMAGE_SIZE = 100

const ContactView = ({ contact, showImage, showContact }) => (
    <View
        key={`contact-details-${Date.now()}`}
        style={{ flex: 1, paddingHorizontal: 10 }}
    >

        <Pressable
            onPress={showImage}
            disabled={!contact.profileImage}
            style={{
                flexDirection: 'row',
                gap: 20,
            }}
        >
            <ProfileImage
                user={contact}
                size={PROFILE_IMAGE_SIZE}
            />
        </Pressable>

    </View>
)

export default ContactView