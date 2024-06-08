import React, { useEffect } from 'react'
import {
    ImageBackground,
    View,
} from 'react-native'
import {
    IconButton,
    LoadingView,
    Screen,
} from '@components'
import {
    useApp,
    useModal,
} from '@context'
import { connect } from '@utils/auth'
import LinearGradient from 'react-native-linear-gradient'
import { classes } from '@styles'
import {
    Display,
    Vendors,
} from '@presentations'
import {
    useContacts,
} from '@context'
import socket from '../socket'

export default ({ navigation }) => {

    const { appLoaded, signIn, theme, userId } = useApp()
    const { updateStatus } = useContacts()
    const { setModal } = useModal()

    useEffect(() => {
        socket.on('signed_in_user', userId => {
            updateStatus({
                userId,
                status: 'signed_in',
            })
        })
        socket.on('signed_out_user', userId => {
            updateStatus({
                userId,
                status: 'signed_out',
            })
        })
    }, [])

    const onConnect = async type => {
        const user = await connect(type)
        if (!user) console.log('Error: Could not connect user.')
        else {
            await signIn(user)
            if (!user) return console.log('error connecting')
            socket.emit('user_signed_in', user._id, response => {
                updateStatus({
                    userId: response,
                    status: 'signed_in',
                })
            })
        }
        // navigation.navigate('Main')
    }

    const renderButtons = () => (
        <View style={{
            paddingVertical: 20,
            justifyContent: 'flex-start',
            // gap: 10,
        }}>

            <View
                style={{
                    flex: 1,
                    width: '100%',
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    paddingBottom: 5,
                    marginBottom: 5,
                    gap: 10,
                    borderBottomWidth: 1,
                    borderBottomStyle: 'dotted',
                }}
            >
                
                <IconButton
                    label='Sign Up to Buy'
                    iconName='arrow-forward-circle-outline'
                    onPress={() => setModal('SIGNUP_CUSTOMER')}
                    alignIcon='right'
                    transparent
                />

                <IconButton
                    type='primary'
                    label='Preview as Customer'
                    iconName='eye-outline'
                    onPress={() => onConnect('customer')}
                    alignIcon='right'
                    padded
                />

            </View>

            <View
                style={{
                    flex: 1,
                    width: '100%',
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    paddingBottom: 5,
                    marginBottom: 5,
                    gap: 10,
                    borderBottomWidth: 1,
                    borderBottomStyle: 'dotted',
                }}
            >
                
                <IconButton
                    label='Sign Up to Sell'
                    iconName='arrow-forward-circle-outline'
                    onPress={() => setModal('SIGNUP_VENDOR')}
                    alignIcon='right'
                    transparent
                />

                <IconButton
                    type='primary'
                    label='Preview as Vendor'
                    iconName='eye-outline'
                    onPress={() => onConnect('vendor')}
                    alignIcon='right'
                    padded
                />

            </View>

            <View
                style={{
                    flex: 1,
                    width: '100%',
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    paddingBottom: 5,
                    marginBottom: 5,
                    gap: 10,
                    borderBottomWidth: 1,
                    borderBottomStyle: 'dotted',
                }}
            >
                
                <IconButton
                    label='Sign Up to Deliver'
                    iconName='arrow-forward-circle-outline'
                    onPress={() => setModal('SIGNUP_DRIVER')}
                    alignIcon='right'
                    transparent
                />

                <IconButton
                    type='primary'
                    label='Preview as Driver'
                    iconName='eye-outline'
                    onPress={() => onConnect('driver')}
                    alignIcon='right'
                    padded
                />

            </View>

        </View>
    )

    if (!appLoaded) return <LoadingView loading='Doing Auth Stuff' />

    return (
        <Screen secure={false} style={[classes.screen, classes.paddingH]}>

            <View
                style={{
                    flexDirection: 'row',
                    // paddingVertical: 20,
                    flexWrap: 'wrap',
                    gap: 10,
                }}
            >
                <View
                    style={{
                        flex: 1,
                        flexShrink: 1,
                        minWidth: 100,
                        maxWidth: 100,
                    }}
                >
                    <Display />
                </View>
                <View
                    style={{
                        flex: 1,
                        flexGrow: 1,
                        // minWidth: 300,
                        maxWidth: 300,
                    }}
                >
                    <Vendors />
                </View>
                {/* <View
                    style={{
                        flex: 1,
                        flexGrow: 1,
                        // minWidth: 300,
                        maxWidth: 300,
                    }}
                >
                    <Contacts />
                </View> */}
            </View>
            {!userId && renderButtons()}
        </Screen>
        // <View
        //     style={{
        //         flex: 1,
        //         justifyContent: 'space-evenly',
        //         height: '100%',
        //     }}
        // >
        //     <Pressable
        //         style={{
        //             flex: 1,
        //             justifyContent: 'flex-end',
        //             padding: 10,
        //             background: '#fff',
        //         }}
        //         onPress={() => props.navigation.navigate('Main')}
        //     >
        //         <Text
        //             style={{
        //                 color: 'orange',
        //                 fontSize: 32,
        //                 fontWeight: 700,
        //                 textAlign: 'right',
        //             }}
        //         >
        //             Searching?
        //         </Text>
        //     </Pressable>

        //     <Pressable
        //         onPress={() => setModal('SIGN_IN')}
        //         style={{
        //             flex: 1,
        //             background: 'orange',
        //             padding: 10,
        //             justifyContent: 'flex-start',
        //         }}
        //     >
        //         <Text
        //             style={{
        //                 fontSize: 32,
        //                 fontWeight: 700,
        //                 color: '#fff',
        //             }}
        //         >
        //             Selling?
        //         </Text>
        //     </Pressable>
            // <ImageSegment
            //     source={`${IMAGE_PATH}/customer-avatar.png`}
            // >

            //     <View
            //         style={{
            //             flexDirection: 'column',
            //             justifyContent: 'flex-start',
            //             flexWrap: 'wrap',
            //             alignItems: 'flex-start',
            //         }}
            //     >
            //         <Text
            //             style={[
            //                 classes.headerSecondary,
            //                 {
            //                     paddingHorizontal: 8,
            //                     paddingVertical: 5,
            //                     color: '#fff',//theme?.colors.textDefault,
            //                 },
            //             ]}
            //         >
            //             Looking?
            //         </Text>
                    
            //         <IconButton
            //             type='primary'
            //             label='Find It'
            //             iconName='arrow-forward-circle-outline'
            //             onPress={() => setModal('SIGNUP_CUSTOMER')}
            //             alignIcon='right'
            //             style={{ marginHorizontal: 3 }}
            //         />
            //     </View>
                
            //     <IconButton
            //         label='Customer'
            //         iconName='eye-outline'
            //         onPress={() => onConnect('customer')}
            //         alignIcon='right'
            //         transparent
            //         type='primary'
            //         align='flex-end'
            //         textStyles={{
            //             color: '#fff',
            //             flexBasis: 'auto',
            //             flexShrink: 1,
            //             flexWrap: 'wrap',
            //             textAlign: 'right',
            //         }}
            //         style={{
            //             color: '#fff',
            //             flexShrink: 1,
            //             flexGrow: 0,
            //         }}
            //     />
            // </ImageSegment>

            // <ImageSegment
            //     source={`${IMAGE_PATH}/vendor-avatar.png`}
            // >
            //     <View
            //         style={{
            //             flexDirection: 'column',
            //             justifyContent: 'flex-start',
            //             flexWrap: 'wrap',
            //             alignItems: 'flex-start',
            //         }}
            //     >
            //         <Text
            //             style={[
            //                 classes.headerSecondary,
            //                 {
            //                     paddingHorizontal: 8,
            //                     paddingVertical: 5,
            //                     color: '#fff',//theme?.colors.textDefault,
            //                 },
            //             ]}
            //         >
            //             Offering?
            //         </Text>
                    
            //         <IconButton
            //             type='primary'
            //             label='Offer It'
            //             iconName='arrow-forward-circle-outline'
            //             onPress={() => setModal('SIGNUP_VENDOR')}
            //             alignIcon='right'
            //             style={{ marginHorizontal: 3 }}
            //         />
            //     </View>

            //     <IconButton
            //         label='Seller'
            //         iconName='eye-outline'
            //         onPress={() => onConnect('vendor')}
            //         alignIcon='right'
            //         transparent
            //         type='primary'
            //         align='flex-end'
            //         textStyles={{
            //             color: '#fff',
            //             flexBasis: 'auto',
            //             flexShrink: 1,
            //             flexWrap: 'wrap',
            //             textAlign: 'right',
            //         }}
            //         style={{
            //             color: '#fff',
            //             flexShrink: 1,
            //             flexGrow: 0,
            //         }}
            //     />

            // </ImageSegment>

            // <ImageSegment
            //     source={`${IMAGE_PATH}/driver-avatar.png`}
            // >
            //     <View
            //         style={{
            //             flexDirection: 'column',
            //             justifyContent: 'flex-start',
            //             flexWrap: 'wrap',
            //             alignItems: 'flex-start',
            //         }}
            //     >
            //         <Text
            //             style={[
            //                 classes.headerSecondary,
            //                 {
            //                     paddingHorizontal: 8,
            //                     paddingVertical: 5,
            //                     color: '#fff',//theme?.colors.textDefault,
            //                 },
            //             ]}
            //         >
            //             Mobile?
            //         </Text>

            //         <IconButton
            //             type='primary'
            //             label='Move It'
            //             iconName='arrow-forward-circle-outline'
            //             onPress={() => setModal('SIGNUP_DRIVER')}
            //             alignIcon='right'
            //             style={{ marginHorizontal: 3 }}
            //         />
            //     </View>
                
            //     <IconButton
            //         label='Driver'
            //         iconName='eye-outline'
            //         onPress={() => onConnect('driver')}
            //         alignIcon='right'
            //         transparent
            //         type='primary'
            //         align='flex-end'
            //         textStyles={{
            //             color: '#fff',
            //             flexBasis: 'auto',
            //             flexShrink: 1,
            //             flexWrap: 'wrap',
            //             textAlign: 'right',
            //         }}
            //         style={{
            //             color: '#fff',
            //             flexShrink: 1,
            //             flexGrow: 0,
            //         }}
            //     />

            // </ImageSegment> */}

        // </View>
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