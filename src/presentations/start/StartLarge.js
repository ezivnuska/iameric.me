import React, { useContext, useEffect } from 'react'
import {
    ImageBackground,
    StyleSheet,
    Text,
    useWindowDimensions,
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

    const dims = useWindowDimensions()

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
                maxWidth: 750,
                width: '100%',
                marginHorizontal: 'auto',
                flex: 1,
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-evenly',
                // // height: '100%',
                // borderWidth: 2,
                // borderColor: 'white',
                // borderStyle: 'dotted',
            }}
        >

            <ImageSegment
                source={`${IMAGE_PATH}/customer-avatar.png`}
            >

                <View
                    style={{
                        flexDirection: 'row',
                        justifyContent: 'flex-start',
                        flexWrap: 'wrap',
                        alignItems: 'center',
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
                        textStyles={{ color: '#fff' }}
                        style={{ marginHorizontal: 3 }}
                    />
                </View>

                <View>
                    <IconButton
                        label='Preview'
                        iconName='eye-outline'
                        onPress={() => onConnect('customer')}
                        alignIcon='right'
                        transparent
                        textStyles={{ color: '#fff' }}
                    />
                </View>
            </ImageSegment>

            <ImageSegment
                source={`${IMAGE_PATH}/vendor-avatar.png`}
            >

                <View
                    style={{
                        flexDirection: 'row',
                        justifyContent: 'flex-start',
                        flexWrap: 'wrap',
                        alignItems: 'center',
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
                        textStyles={{ color: '#fff' }}
                        style={{ marginHorizontal: 3 }}
                    />
                </View>

                <View>
                    <IconButton
                        label='Preview'
                        iconName='eye-outline'
                        onPress={() => onConnect('vendor')}
                        alignIcon='right'
                        transparent
                        textStyles={{ color: '#fff' }}
                    />
                </View>
            </ImageSegment>

            <ImageSegment
                source={`${IMAGE_PATH}/driver-avatar.png`}
            >

                <View
                    style={{
                        flexDirection: 'row',
                        justifyContent: 'flex-start',
                        flexWrap: 'wrap',
                        alignItems: 'center',
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
                        textStyles={{ color: '#fff' }}
                        style={{ marginHorizontal: 3 }}
                    />
                </View>

                <IconButton
                    label='Preview'
                    iconName='eye-outline'
                    onPress={() => onConnect('driver')}
                    alignIcon='right'
                    transparent
                    textStyles={{ color: '#fff' }}
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
                    paddingVertical: 7,
                    paddingHorizontal: 5,
                    opacity: 1,
                    width: '100%',
                    maxWidth: 750,
                    marginHorizontal: 'auto',
                    // borderWidth: 1,
                    // borderColor: 'yellow',
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