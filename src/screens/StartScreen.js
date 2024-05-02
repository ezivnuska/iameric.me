import React, { useEffect } from 'react'
import {
    ImageBackground,
    Text,
    View,
} from 'react-native'
import {
    IconButton,
    LoadingView,
} from '@components'
import {
    useApp,
    useModal,
    useUser,
} from '@context'
import {
    connect,
} from '@utils/auth'
import classes from '@styles/classes'
import LinearGradient from 'react-native-linear-gradient'

const IMAGE_PATH = __DEV__ ? 'https://iameric.me/assets' : '/assets'

export default props => {

    const { appLoaded, signIn } = useApp()
    const { setModal } = useModal()
    const { profile } = useUser()

    useEffect(() => {
        if (profile) props.navigation.navigate('Auth')
    }, [profile])

    const onConnect = async type => {
        const user = await connect(type)
        if (!user) console.log('Error: Could not connect user.')
        else await signIn(user)
        return user
    }

    if (!appLoaded) return <LoadingView loading='Doing Auth Stuff' />

    return (
        <View
            style={{
                flex: 1,
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-evenly',
                height: '100%',
            }}
        >

            <ImageSegment
                source={`${IMAGE_PATH}/customer-avatar.png`}
            >

                <View
                    style={{
                        flexDirection: 'column',
                        justifyContent: 'flex-start',
                        flexWrap: 'wrap',
                        alignItems: 'flex-start',
                    }}
                >
                    <Text
                        style={[
                            classes.headerSecondary,
                            {
                                paddingHorizontal: 8,
                                paddingVertical: 5,
                                color: '#fff',//theme?.colors.textDefault,
                            },
                        ]}
                    >
                        Looking?
                    </Text>
                    
                    <IconButton
                        type='primary'
                        label='Find It'
                        iconName='arrow-forward-circle-outline'
                        onPress={() => setModal('SIGNUP_CUSTOMER')}
                        alignIcon='right'
                        style={{ marginHorizontal: 3 }}
                    />
                </View>
                
                <IconButton
                    label='Customer'
                    iconName='eye-outline'
                    onPress={() => onConnect('customer')}
                    alignIcon='right'
                    transparent
                    type='primary'
                    align='flex-end'
                    textStyles={{
                        color: '#fff',
                        flexBasis: 'auto',
                        flexShrink: 1,
                        flexWrap: 'wrap',
                        textAlign: 'right',
                    }}
                    style={{
                        color: '#fff',
                        flexShrink: 1,
                        flexGrow: 0,
                    }}
                />
            </ImageSegment>

            <ImageSegment
                source={`${IMAGE_PATH}/vendor-avatar.png`}
            >
                <View
                    style={{
                        flexDirection: 'column',
                        justifyContent: 'flex-start',
                        flexWrap: 'wrap',
                        alignItems: 'flex-start',
                    }}
                >
                    <Text
                        style={[
                            classes.headerSecondary,
                            {
                                paddingHorizontal: 8,
                                paddingVertical: 5,
                                color: '#fff',//theme?.colors.textDefault,
                            },
                        ]}
                    >
                        Offering?
                    </Text>
                    
                    <IconButton
                        type='primary'
                        label='Offer It'
                        iconName='arrow-forward-circle-outline'
                        onPress={() => setModal('SIGNUP_VENDOR')}
                        alignIcon='right'
                        style={{ marginHorizontal: 3 }}
                    />
                </View>

                <IconButton
                    label='Seller'
                    iconName='eye-outline'
                    onPress={() => onConnect('vendor')}
                    alignIcon='right'
                    transparent
                    type='primary'
                    align='flex-end'
                    textStyles={{
                        color: '#fff',
                        flexBasis: 'auto',
                        flexShrink: 1,
                        flexWrap: 'wrap',
                        textAlign: 'right',
                    }}
                    style={{
                        color: '#fff',
                        flexShrink: 1,
                        flexGrow: 0,
                    }}
                />

            </ImageSegment>

            <ImageSegment
                source={`${IMAGE_PATH}/driver-avatar.png`}
            >
                <View
                    style={{
                        flexDirection: 'column',
                        justifyContent: 'flex-start',
                        flexWrap: 'wrap',
                        alignItems: 'flex-start',
                    }}
                >
                    <Text
                        style={[
                            classes.headerSecondary,
                            {
                                paddingHorizontal: 8,
                                paddingVertical: 5,
                                color: '#fff',//theme?.colors.textDefault,
                            },
                        ]}
                    >
                        Mobile?
                    </Text>

                    <IconButton
                        type='primary'
                        label='Move It'
                        iconName='arrow-forward-circle-outline'
                        onPress={() => setModal('SIGNUP_DRIVER')}
                        alignIcon='right'
                        style={{ marginHorizontal: 3 }}
                    />
                </View>
                
                <IconButton
                    label='Driver'
                    iconName='eye-outline'
                    onPress={() => onConnect('driver')}
                    alignIcon='right'
                    transparent
                    type='primary'
                    align='flex-end'
                    textStyles={{
                        color: '#fff',
                        flexBasis: 'auto',
                        flexShrink: 1,
                        flexWrap: 'wrap',
                        textAlign: 'right',
                    }}
                    style={{
                        color: '#fff',
                        flexShrink: 1,
                        flexGrow: 0,
                    }}
                />

            </ImageSegment>

        </View>
    )
}

const ImageSegment = ({ children, source }) => {
    
    const { theme } = useApp()

    return (
        <ImageBackground
            style={{ flex: 1 }}
            resizeMode='cover'
            source={source}
        >
            <LinearGradient
                style={{
                    flex: 1,
                    flexDirection: 'row',
                    alignItems: 'flex-end',
                    justifyContent: 'space-between',
                    paddingVertical: 10,
                    paddingHorizontal: 5,
                    opacity: 1,
                }}
                colors={theme?.dark
                    ? [ '#00000000', '#000000' ]
                    : [ '#00000000', '#000000' ]
                }
            >

                {children}

            </LinearGradient>

        </ImageBackground>
    )
}