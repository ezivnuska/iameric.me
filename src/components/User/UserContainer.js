import React from 'react'
import { Pressable, View } from 'react-native'
import { useModal, useUser } from '@context'
import { ProfileImage, ProfileNav, TextCopy } from '@components'

const PROFILE_IMAGE_SIZE = 100

const UserContainer = props => {

    const { setModal } = useModal()
    const { user } = useUser()

    return (
        <View
            {...props}
            style={{
                flex: 1,
                paddingHorizontal: 10,
            }}
        >
            <View
                style={{
                    flexDirection: 'row',
                    gap: 20,
                }}
            >

                <Pressable
                    onPress={() => {
                        // clearUserModals()
                        if (user.profileImage) {
                            setModal('SHOWCASE', user.profileImage)
                        } else {
                            setModal('IMAGE_UPLOAD', { avatar: true })
                        }
                    }}
                    style={{
                        height: PROFILE_IMAGE_SIZE,
                        width: PROFILE_IMAGE_SIZE,
                        borderRadius: 8,
                        overflow: 'hidden',
                    }}
                >
                    <View
                        style={{
                            flex: 1,
                            flexDirection: 'row',
                            alignItems: 'center',
                            justifyContent: 'center',
                            width: '100%',
                            backgroundColor: 'rgba(255, 99, 71, 1)',
                        }}
                    >
                        {!user.profileImage ? (
                            <TextCopy
                                color='#fff'
                                size={20}
                                align='center'
                                bold
                            >
                                {`Add\nAvatar`}
                            </TextCopy>

                        ) : <ProfileImage size={PROFILE_IMAGE_SIZE} />}
                    </View>
                    
                </Pressable>

                <View style={{ flexGrow: 1 }}>
                    <ProfileNav {...props} />
                </View>
                
            </View>

        </View>
    )
}

export default UserContainer