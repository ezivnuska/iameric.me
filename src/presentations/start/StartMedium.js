import React from 'react'
import {
    ImageBackground,
    View,
} from 'react-native'
import {
    IconButton,
    ThemedText,
} from '@components'
import { useApp, useModal } from '@context'
import { connect } from '@utils/auth'
import { classes } from '@styles'
import LinearGradient from 'react-native-linear-gradient'

const IMAGE_PATH = __DEV__ ? 'https://iameric.me/assets' : '/assets'

export default () => {

    const { setModal } = useModal()

    const onConnect = async type => {
        
        const connectedUser = await connect(type)
        
        if (!connectedUser) {
            console.log('Error: Could not connect user.')
            return
        } else {
            setUser(connectedUser)
            return
        }
    }

    const setUser = async ({
        _id,
        email,
        images,
        profileImage,
        role,
        token,
        username,
    }) => {
        dispatch({
            type: 'SET_USER',
            user: {
                _id,
                email,
                images,
                profileImage,
                role,
                token,
                username,
            },
        })
    }

    return (
        <View
            style={{
                flex: 1,
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-evenly',
                height: '100%',
            }}
        >

            <ImageSegment
                source={`${IMAGE_PATH}/customer-avatar.png`}
            >

                <View
                    style={{
                        textAlign: 'left',
                    }}
                >
                    <ThemedText
                        style={[
                            classes.headerSecondary,
                            {
                                padding: 7,
                                color: '#fff',//theme?.colors.textDefault,
                            },
                        ]}
                    >
                        Looking?
                    </ThemedText>

                    <IconButton
                        type='primary'
                        label='Find It'
                        iconName='arrow-forward-circle-outline'
                        onPress={() => setModal('SIGNUP_CUSTOMER')}
                        alignIcon='right'
                        textStyles={{ color: '#fff' }}
                        style={{ marginVertical: 5 }}
                    />
                </View>

                <IconButton
                    label='Preview'
                    iconName='eye-outline'
                    onPress={() => onConnect('customer')}
                    alignIcon='right'
                    transparent
                    textStyles={{ color: '#fff' }}
                    style={{ marginVertical: 5 }}
                />
            </ImageSegment>

            <ImageSegment
                source={`${IMAGE_PATH}/vendor-avatar.png`}
            >

                <View
                    style={{
                        textAlign: 'left',
                    }}
                >
                    <ThemedText
                        style={[
                            classes.headerSecondary,
                            {
                                padding: 7,
                                color: '#fff',//theme?.colors.textDefault,
                            },
                        ]}
                    >
                        Offering?
                    </ThemedText>

                    <IconButton
                        type='primary'
                        label='Offer It'
                        iconName='arrow-forward-circle-outline'
                        onPress={() => setModal('SIGNUP_VENDOR')}
                        alignIcon='right'
                        textStyles={{ color: '#fff' }}
                        style={{ marginVertical: 5 }}
                    />
                </View>

                <IconButton
                    label='Preview'
                    iconName='eye-outline'
                    onPress={() => onConnect('vendor')}
                    alignIcon='right'
                    transparent
                    textStyles={{ color: '#fff' }}
                    style={{ marginVertical: 5 }}
                />

            </ImageSegment>

            <ImageSegment
                source={`${IMAGE_PATH}/driver-avatar.png`}
            >

                <View
                    style={{
                        textAlign: 'left',
                    }}
                >
                    <ThemedText
                        style={[
                            classes.headerSecondary,
                            {
                                padding: 7,
                                color: '#fff',//theme?.colors.textDefault,
                            },
                        ]}
                    >
                        Mobile?
                    </ThemedText>

                    <IconButton
                        type='primary'
                        label='Move It'
                        iconName='arrow-forward-circle-outline'
                        onPress={() => setModal('SIGNUP_DRIVER')}
                        alignIcon='right'
                        textStyles={{ color: '#fff' }}
                        style={{ marginVertical: 5 }}
                    />
                </View>

                <IconButton
                    label='Preview'
                    iconName='eye-outline'
                    onPress={() => onConnect('driver')}
                    alignIcon='right'
                    transparent
                    textStyles={{ color: '#fff' }}
                    style={{ marginVertical: 5 }}
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
                    flexDirection: 'column',
                    justifyContent: 'flex-end',
                    paddingVertical: 5,
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