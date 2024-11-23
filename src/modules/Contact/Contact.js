import React from 'react'
import { Pressable, View } from 'react-native'
import { ActivityIndicator, ProfileImage, ScreenHeader } from '@components'
import { ContactModal, useContact } from '.'

const Contact = () => {

    const {
        contact,
        contactLoading,
        contactModal,
        closeContactModal,
        setContactModal,
    } = useContact()

    if (contactLoading) return <ActivityIndicator size='medium' label='Loading Contact...' />

    return contact
        ? (
            <View
                key={`contact-details-${Date.now()}`}
                style={{ flex: 1 }}
            >
                
                <ScreenHeader
                    label={contact.username}
                />

                <View style={{ paddingHorizontal: 10 }}>
                    <Pressable
                        onPress={() => setContactModal('SHOWCASE', contact.profileImage)}
                        disabled={!contact.profileImage}
                    >
                        <ProfileImage
                            user={contact}
                            size={100}
                        />
                    </Pressable>
                    
                </View>
                
                <ContactModal
                    user={contact}
                    modal={contactModal}
                    onClose={closeContactModal}
                />

            </View>
        ) : null
}

export default Contact