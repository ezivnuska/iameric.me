import React, { useContext, useEffect } from 'react'
import {
    ImageBackground,
    Text,
    View,
} from 'react-native'
import {
    IconButton,
} from '@components'
import { AppContext } from '../../AppContext'
import { connect, initialize } from '@utils/auth'
import classes from '@styles/classes'
import LinearGradient from 'react-native-linear-gradient'
import { useTheme } from 'react-native-paper'

const IMAGE_PATH = __DEV__ ? 'https://iameric.me/assets' : '/assets'

export default () => {

    const {
        dispatch,
    } = useContext(AppContext)

    useEffect(() => {
        initialize(dispatch)
    }, [])

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
                        onPress={() => dispatch({ type: 'SET_MODAL', modalName: 'SIGNUP_CUSTOMER' })}
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
                        onPress={() => dispatch({ type: 'SET_MODAL', modalName: 'SIGNUP_VENDOR' })}
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
                        onPress={() => dispatch({ type: 'SET_MODAL', modalName: 'SIGNUP_DRIVER' })}
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
    )
}

const ImageSegment = ({ children, source }) => {
    
    const theme = useTheme()

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