import React, { useEffect } from 'react'
import { Pressable, View } from 'react-native'
import { ActivityIndicator, DefaultText, IconButtonLarge, ProfileImage } from '@components'
import { useContacts } from '@contacts'

const PROFILE_IMAGE_SIZE = 100

const Contact = props => {

    const {
        contact,
        contactLoading,
        initContact,
        setContactModal,
    } = useContacts()

    useEffect(() => {
        if (!contact || contact.username !== props.route.params?.username) {
            initContact(props.route.params.username)
        }
    }, [contact])

    return contactLoading
        ? <ActivityIndicator size='medium' label='Loading Contact...' />
        : contact
            ? (
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

                        <View style={{ flexGrow: 0, gap: 10 }}>

                            <DefaultText bold size={36}>
                                {contact.username}
                            </DefaultText>

                            {
                                contact.images.length > 0 && (
                                    <IconButtonLarge
                                        name='images'
                                        label='Images'
                                        size={34}
                                        transparent
                                        onPress={() => props.navigation.navigate('Images', { username: contact.username })}
                                    />
                                )
                            }

                        </View>
                    </Pressable>

                </View>
            )
            : <DefaultText>User not found.</DefaultText>
}

export default Contact