import React from 'react'
import {
    Image,
    Pressable,
    View,
} from 'react-native'
import { ThemedText } from '@components'
import {
    UserHeader,
    UserImages,
    UserModal,
    useUser,
} from '.'
// import { ImagesContextProvider } from './UserImages'
import { useApp } from '@app'
import Icon from 'react-native-vector-icons/Ionicons'

const IMAGE_PATH = __DEV__ ? 'https://iameric.me/assets' : '/assets'

const User = props => {

    const { theme } = useApp()
    const {
        closeUserModal,
        user,
        userModal,
        setUserModal,
    } = useUser()

    const source = (user && user.profileImage)
        ? `${IMAGE_PATH}/${user.username}/${user.profileImage.filename}`
        : `${IMAGE_PATH}/avatar-default.png`
    
    return (
        <View {...props}>
            
            <UserHeader username={user.username} {...props} />

            <View style={{ flexGrow: 1 }}>
                <Pressable
                    onPress={() => {
                        if (user && user.profileImage) {
                            setUserModal('SHOWCASE', user.profileImage)
                        } else {
                            setUserModal('IMAGE', { avatar: true })
                        }
                    }}
                    style={{
                        position: 'relative',
                        width: 150,
                        height: 150,
                        borderWidth: 1,
                        borderColor: theme?.colors.textDefault,
                    }}
                    // disabled={!user.profileImage}
                >
                    {!user.profileImage ? (
                        <View
                            style={{
                                position: 'absolute',
                                top: 0,
                                left: 0,
                                bottom: 0,
                                right: 0,
                                flexDirection: 'row',
                                alignContent: 'center',
                                alignItems: 'center',
                                justifyContent: 'center',
                                backgroundColor: 'rgba(0, 0, 0, 0.65)',
                                zIndex: 100,
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
                    ) : (
                        <Image
                            source={source}
                            resizeMode='cover'
                            style={{
                                position: 'absolute',
                                top: 0,
                                left: 0,
                                bottom: 0,
                                right: 0,
                                zIndex: 10,
                            }}
                        />
                    )}
                    
                </Pressable>
            </View>

            <UserModal
                modal={userModal}
                onCancel={closeUserModal}
            />
        </View>
    )
}

export default User