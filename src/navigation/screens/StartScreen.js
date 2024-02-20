import React, { useContext, useEffect } from 'react'
import {
    ImageBackground,
    StyleSheet,
    Text,
    View,
} from 'react-native'
import {
    IconButton,
    Screen,
} from '@components'
import { AppContext } from '../../AppContext'
import { connect, initialize } from '@utils/auth'
import classes from '@styles/classes'
import LinearGradient from 'react-native-linear-gradient'
import { useTheme } from 'react-native-paper'

const IMAGE_PATH = __DEV__ ? 'https://iameric.me/assets' : '/assets'

export default () => {

    const {
        dims,
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
        <Screen secure={false}>
            <View style={[
                {
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-evenly',
                    alignItems: 'stretch',
                    overflow: 'visible',
                    height: dims ? dims.window.height - 100 : '100%',
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

    return (
        <View
            style={{
                flex: 1,
                position: 'relative',
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
                                position: 'absolute',
                                bottom: 60,
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

const styles = StyleSheet.create({
    controls: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        position: 'absolute',
        bottom: 15,
        width: '100%',
        paddingHorizontal: 15,
    },
})