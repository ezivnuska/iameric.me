import React, { useEffect } from 'react'
import { Pressable, View } from 'react-native'
import { ActivityIndicator, ProfileImage, ProfileNav } from '@components'
import { useContacts } from '@contacts'

const PROFILE_IMAGE_SIZE = 150

const Contact = props => {

    const {
        contact,
        contactLoading,
        initContact,
        setContactModal,
    } = useContacts()

    useEffect(() => {
        if (!contact || contact.username !== props.route.params.username) {
            initContact(props.route.params.username)
        }
    }, [contact])

    if (contactLoading) return <ActivityIndicator size='medium' label='Loading Contact...' />

    return contact && (
        <View
            key={`contact-details-${Date.now()}`}
            style={{ flex: 1 }}
        >

            <Pressable
                onPress={() => setContactModal('SHOWCASE', contact.profileImage)}
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

                <ProfileNav contact={contact} {...props} />
            </Pressable>

        </View>
    )
}

export default Contact