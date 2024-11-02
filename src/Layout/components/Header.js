import React, { useMemo } from 'react'
import {
    Image,
    Pressable,
    View,
} from 'react-native'
import {
    IconButton,
    SimpleButton,
    ThemedText,
} from '@components'
import { useApp } from '@app'
import { useModal } from '@modal'
import { navigate } from '@utils/navigation'

const IMAGE_PATH = __DEV__ ? 'https://iameric.me/assets' : '/assets'
const HEADER_HEIGHT = 50

export default ({ route }) => {

    const {
        dims,
        theme,
        user,
    } = useApp()

    const { setModal } = useModal()

    const renderBrand = () => dims.width < 340 ? 'iam' : 'iameric'

    const routeName = useMemo(() => route && route.name, [route])

    const isCurrentRoute = name => name === routeName

    const source = (user && user.profileImage)
        ? `${IMAGE_PATH}/${user.username}/${user.profileImage.filename}`
        : `${IMAGE_PATH}/avatar-default.png`

    return (
        <View
            style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                gap: 10,
                height: HEADER_HEIGHT,
                width: '100%',
                minWidth: 300,
                maxWidth: 400,
                paddingHorizontal: 10,
                marginHorizontal: 'auto',
            }}
        >
            <View style={{ flexGrow: 0 }}>

                <Pressable
                    onPress={() => navigate('Home')}
                >

                    <ThemedText bold style={{ fontSize: 24 }}>
                        {renderBrand()}
                    </ThemedText>

                </Pressable>

            </View>
                
            <View
                style={{
                    flexGrow: 1,
                    flexDirection: 'row',
                    justifyContent: 'space-evenly',
                    alignItems: 'center',
                    gap: 3,
                }}
            >
                {user ? (
                    <View
                        style={{
                            flexGrow: 1,
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            alignItems: 'baseline',
                            gap: 3,
                        }}
                    >
                        {/* <IconButton
                            name={`home-${isCurrentRoute('Home') ? 'sharp' : 'outline'}`}
                            onPress={() => navigate('Home')}
                            disabled={isCurrentRoute('Home')}
                        /> */}

                        {/* <IconButton
                            name={`chatbubbles-${isCurrentRoute('Forum') ? 'sharp' : 'outline'}`}
                            onPress={() => navigate('Forum')}
                            disabled={isCurrentRoute('Forum')}
                        /> */}

                        {/* {user.role === 'admin' && (
                            <IconButton
                                name={`people-${isCurrentRoute('Contacts') ? 'sharp' : 'outline'}`}
                                onPress={() => navigate('Contacts')}
                                disabled={isCurrentRoute('Contacts')}
                            />
                        )}

                        {user.role === 'admin' && (
                            <IconButton
                                name={`mail-${isCurrentRoute('Mail') ? 'sharp' : 'outline'}`}
                                onPress={() => navigate('Mail')}
                                disabled={isCurrentRoute('Mail')}
                            />
                        )} */}
                    </View>
                )
                : null
                // (
                //     <Pressable
                //         onPress={() => navigate('About')}
                //         disabled={isCurrentRoute('About')}
                //     >
                //         <ThemedText
                //             bold={routeName === 'About'}
                //         >
                //             Who is Eric?
                //         </ThemedText>
                //     </Pressable>
                // )
            }
            </View>

            <View style={{ flexGrow: 0 }}>

                {user ? (
                    <Pressable
                        onPress={() => navigate('User', { screen: 'Profile' })}
                        style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                            gap: 10,
                        }}
                    >
                        <View
                            style={{
                                width: 24,
                                height: 24,
                                borderRadius: 12,
                                borderWidth: 1,
                                borderColor: theme?.colors.textDefault,
                                overflow: 'hidden',
                            }}
                        >
                            <Image
                                source={source}
                                resizeMode='cover'
                                style={{
                                    width: 24,
                                    height: 24,
                                }}
                            />
                        </View>

                        <ThemedText>{user.username}</ThemedText>
                        
                    </Pressable>
                ) : (
                    <SimpleButton
                        label='Sign In'
                        onPress={() => setModal('AUTH')}
                    />
                )}
            </View>

        </View>
    )
}