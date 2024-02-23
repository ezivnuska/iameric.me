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
import {
    Screen,
} from '.'
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

    const styles = StyleSheet.create({
        controls: {
            display: 'flex',
            flexDirection: dims.width > 600 ? 'column' : 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            position: 'absolute',
            bottom: 15,
            width: '100%',
            paddingHorizontal: 15,
        },
    })

    return (
        <Screen secure={false}>
            <View style={[
                {
                    display: 'flex',
                    flexDirection: dims.width > 600 ? 'row' : 'column',
                    justifyContent: 'space-evenly',
                    alignItems: 'stretch',
                    overflow: 'visible',
                    height: dims.height - 50,
                },
            ]}>

                <BackgroundImageWithGradient
                    caption='Hungry?'
                    source={`${IMAGE_PATH}/customer-avatar.png`}
                >
                    <View style={styles.controls}>
                        <IconButton
                            type='primary'
                            label='Sign Up to Order!'
                            iconName='arrow-forward-circle-outline'
                            onPress={() => dispatch({ type: 'SET_MODAL', modalName: 'SIGNUP_CUSTOMER' })}
                            alignIcon='right'
                            textStyles={{ color: '#fff' }}
                        />
                        <IconButton
                            label='Preview'
                            iconName='eye-outline'
                            onPress={() => onConnect('customer')}
                            alignIcon='right'
                            transparent
                            textStyles={{ color: '#fff' }}
                        />
                    </View>
                </BackgroundImageWithGradient>

                <BackgroundImageWithGradient
                    caption='Selling?'
                    source={`${IMAGE_PATH}/vendor-avatar.png`}
                >
                    <View style={styles.controls}>
                        <IconButton
                            type='primary'
                            label='Join as Merchant!'
                            iconName='arrow-forward-circle-outline'
                            onPress={() => dispatch({ type: 'SET_MODAL', modalName: 'SIGNUP_VENDOR' })}
                            alignIcon='right'
                            textStyles={{ color: '#fff' }}
                        />
                        <IconButton
                            label='Preview'
                            iconName='eye-outline'
                            onPress={() => onConnect('vendor')}
                            alignIcon='right'
                            transparent
                            textStyles={{ color: '#fff' }}
                        />
                    </View>
                </BackgroundImageWithGradient>

                <BackgroundImageWithGradient
                    caption='Driving?'
                    source={`${IMAGE_PATH}/driver-avatar.png`}
                >
                    <View style={styles.controls}>
                        <IconButton
                            type='primary'
                            label='Become a Driver!'
                            iconName='arrow-forward-circle-outline'
                            onPress={() => dispatch({ type: 'SET_MODAL', modalName: 'SIGNUP_DRIVER' })}
                            alignIcon='right'
                            textStyles={{ color: '#fff' }}
                        />
                        
                        <IconButton
                            label='Preview'
                            iconName='eye-outline'
                            onPress={() => onConnect('driver')}
                            alignIcon='right'
                            transparent
                            textStyles={{ color: '#fff' }}
                        />
                    </View>
                </BackgroundImageWithGradient>

            </View>
            
        </Screen>
    )
}

const BackgroundImageWithGradient = ({ caption, children, source }) => {
    
    const theme = useTheme()
    const dims = useWindowDimensions()

    return (
        <View
            style={{
                flex: 1,
                position: 'relative',
                minWidth: dims.width > 600 ? 200 : 300,
            }}
        >
            <ImageBackground
                style={{ flex: 1 }}
                resizeMode='cover'
                source={source}
            >
                <LinearGradient
                    style={{ flex: 1, opacity: 1 }}
                    colors={theme?.dark
                        ? [ '#00000000', '#000000' ]
                        : [ '#00000000', '#000000' ]
                    }
                >
                    <Text
                        style={[
                            classes.headerSecondary,
                            {
                                flex: 1,
                                // position: 'absolute',
                                position: dims.width > 600 ? 'absolute' : 'relative',
                                bottom: dims.width > 600 ? 100 : 95,
                                left: 20,
                                fontWeight: 700,
                                color: '#fff',//theme?.colors.textDefault,
                            },
                        ]}
                    >
                        {caption}        
                    </Text>

                    {children}

                </LinearGradient>

            </ImageBackground>

        </View>
    )
}