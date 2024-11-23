import React from 'react'
import { Pressable, View } from 'react-native'
import { UserModal, useUser } from '.'
import { ProfileImage, ProfileNav, ThemedText } from '@components'
import Icon from 'react-native-vector-icons/Ionicons'

const PROFILE_IMAGE_SIZE = 150

const User = props => {

    const {
        user,
        setUserModal,
        userModal,
        closeUserModal,
    } = useUser()

    return (
        <View
            {...props}
            style={{
                flex: 1,
                paddingHorizontal: 10,
                paddingVertical: 10,
            }}
        >
            <View
                style={{
                    flexDirection: 'row',
                    gap: 10,
                }}
            >

                <Pressable
                    onPress={() => {
                        if (user.profileImage) {
                            setUserModal('SHOWCASE', user.profileImage)
                        } else {
                            setUserModal('IMAGE_UPLOAD', { avatar: true })
                        }
                    }}
                    style={{
                        height: PROFILE_IMAGE_SIZE,
                        width: PROFILE_IMAGE_SIZE,
                        borderRadius: 8,
                        overflow: 'hidden',
                    }}
                >
                    {!user.profileImage ? (
                        <View
                            style={{
                                flex: 1,
                                flexDirection: 'row',
                                alignItems: 'center',
                                justifyContent: 'center',
                                width: '100%',
                                backgroundColor: 'rgba(0, 0, 0, 0.65)',
                            }}
                        >
                            <View>

                                <Icon
                                    name='add-sharp'
                                    size={50}
                                    color='#fff'
                                    style={{ marginHorizontal: 'auto' }}
                                />

                                <ThemedText
                                    color='#fff'
                                    size={20}
                                    align='center'
                                    bold
                                >
                                    Add Avatar
                                </ThemedText>

                            </View>

                        </View>
                    ) : <ProfileImage user={user} size={PROFILE_IMAGE_SIZE} />}
                    
                </Pressable>

                <ProfileNav user={user} route={props.route} />
            </View>

            <UserModal
                modal={userModal}
                onCancel={closeUserModal}
            />
        </View>
    )
}

export default User