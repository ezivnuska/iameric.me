import React, { useEffect } from 'react'
import {
    ImageBackground,
    Text,
    View,
} from 'react-native'
import {
    Screen,
} from '.'
import {
    IconButton,
} from '../components'
import classes from '@styles/classes'
import LinearGradient from 'react-native-linear-gradient'
import {
    useAuth,
    useApp,
    useModal,
    useUser,
} from '@context'
import {
    connect,
} from '@utils/auth'
import { authenticate } from '@utils/auth'

const IMAGE_PATH = __DEV__ ? 'https://iameric.me/assets' : '/assets'

export default ({ navigation }) => {

    const { authToken, signIn, status } = useAuth()
    const { profile, setUser } = useUser()
    const { setModal } = useModal()

    useEffect(() => {
        if (profile) {
            navigation.navigate('Tabs')
        }
    }, [profile])

    useEffect(() => {
        const checkToken = async () => {
            console.log('token found. checking...')
            const user = await authenticate(authToken)
            if (user) {
                console.log('token verified.')
                signIn(authToken)
                setUser(user)
            }
        }
        if (authToken) checkToken()
    }, [status])

    const onConnect = async type => {
        
        const connectedUser = await connect(type)
        
        if (!connectedUser) {
            console.log('Error: Could not connect user.')
        } else {
            signIn(connectedUser.token)
            setUser(connectedUser)
        }
        return connectedUser
    }

    return (
        <Screen
            tabs={false}
            padded={false}
        >
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
                        label='Browse Vendors'
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
                        label='Preview Sales'
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
                        label='Preview Delivery'
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
        </Screen>
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