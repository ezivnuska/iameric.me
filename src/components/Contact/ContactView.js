import React from 'react'
import { Pressable, View } from 'react-native'
import { TextCopy, IconButtonLarge, ProfileImage } from '@components'

const PROFILE_IMAGE_SIZE = 100

const ContactView = ({ contact, showImage, showContact }) => (
    <View
        key={`contact-details-${Date.now()}`}
        style={{ flex: 1 }}
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
                contact={contact}
                size={PROFILE_IMAGE_SIZE}
            />

            <View style={{ flexGrow: 0, gap: 10 }}>

                <TextCopy bold size={36}>
                    {contact.username}
                </TextCopy>

                {
                    contact.images.length > 0 && (
                        <IconButtonLarge
                            name='images'
                            label='Images'
                            size={34}
                            transparent
                            onPress={showContact}
                        />
                    )
                }

            </View>
        </Pressable>

    </View>
)

export default ContactView