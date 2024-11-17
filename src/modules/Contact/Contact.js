import React from 'react'
import { Pressable, View } from 'react-native'
import { Images } from './components'
import { ActivityIndicator, ProfileImage, ScreenHeader } from '@components'
import { ContactModal, useContact } from '.'

const Contact = () => {

    const {
        contact,
        closeContactModal,
        contactModal,
        contactLoading,
        setContactModal,
    } = useContact()

    return contactLoading
        ? <ActivityIndicator size='medium' />
        : (
            <View
                key={`contact-details-${Date.now()}`}
                style={{ flex: 1 }}
            >
                
                <ScreenHeader
                    label={contact.username}
                />

                <Pressable
                    onPress={() => setContactModal('SHOWCASE', contact.profileImage)}
                    disabled={!contact.profileImage}
                >
                    <ProfileImage
                        user={contact}
                        size={100}
                    />
                </Pressable>
                
                <View style={{ marginVertical: 20 }}>
                    <Images contactId={contact._id} />
                </View>
                
                <ContactModal
                    modal={contactModal}
                    onCancel={closeContactModal}
                />

            </View>
        )
}

export default Contact