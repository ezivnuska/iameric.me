import React from 'react'
import {
    ImageBackground,
    Pressable,
    Text,
    View,
} from 'react-native'
import {
    IconButton,
    LoadingView,
    Screen,
    ThemedText,
} from '@components'
import {
    useApp,
    useModal,
} from '@context'
import { connect } from '@utils/auth'
import LinearGradient from 'react-native-linear-gradient'
import { classes } from '@styles'

export default ({ navigation }) => {

    const { appLoaded, signIn, theme, userId } = useApp()
    const { setModal } = useModal()

    const onConnect = async type => {
        const user = await connect(type)
        if (!user) console.log('Error: Could not connect user.')
        else await signIn(user)
        navigation.navigate('Main')
    }

    if (!appLoaded) return <LoadingView loading='Doing Auth Stuff' />

    return (
        <Screen secure={false} style={classes.paddingH}>

            <View style={{ height: '100%', justifyContent: 'space-between', paddingVertical: 20 }}>
                <View style={{ flex: 1 }}>
                    
                    <View style={{ marginBottom: 10 }}>
                        <ThemedText style={classes.headerSecondary}>Browsing?</ThemedText>
                        <ThemedText style={classes.textDefault}>Search local items for sale, or free, listed by the community.</ThemedText>
                    </View>

                    <IconButton
                        type='primary'
                        label='Browse Vendors'
                        iconName='arrow-forward-circle-outline'
                        onPress={() => navigation.navigate('Main')}
                        alignIcon='right'
                    />

                </View>

                <View style={{ flex: 1 }}>
                    
                    <View style={{ marginBottom: 10 }}>
                        <ThemedText style={classes.headerSecondary}>Buying?</ThemedText>
                        <ThemedText style={classes.textDefault}>Sign up now, or preview the customer experience.</ThemedText>
                    </View>

                    <View
                        style={{
                            width: '100%',
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            gap: 10,
                        }}
                    >
                        
                        <IconButton
                            type='primary'
                            label='Sign Up'
                            iconName='arrow-forward-circle-outline'
                            onPress={() => setModal('SIGNUP_CUSTOMER')}
                            alignIcon='right'
                        />

                        <IconButton
                            label='Preview'
                            iconName='eye-outline'
                            onPress={() => onConnect('customer')}
                            alignIcon='right'
                            transparent
                        />

                    </View>
                </View>

                <View style={{ flex: 1 }}>

                    <View style={{ marginBottom: 10 }}>
                        <ThemedText style={classes.headerSecondary}>Selling?</ThemedText>
                        <ThemedText style={classes.textDefault}>Sign up now, or preview the vendor experience.</ThemedText>
                    </View>
                    
                    <View
                        style={{
                            width: '100%',
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            gap: 10,
                        }}
                    >
                        
                        <IconButton
                            type='primary'
                            label='Sign Up'
                            iconName='arrow-forward-circle-outline'
                            onPress={() => setModal('SIGNUP_VENDOR')}
                            alignIcon='right'
                        />

                        <IconButton
                            label='Preview'
                            iconName='eye-outline'
                            onPress={() => onConnect('vendor')}
                            alignIcon='right'
                            transparent
                        />

                    </View>
                </View>

                <View style={{ flex: 1 }}>

                    <View style={{ marginBottom: 10 }}>
                        <ThemedText style={classes.headerSecondary}>Driving?</ThemedText>
                        <ThemedText style={classes.textDefault}>Sign up now, or preview the driver experience.</ThemedText>
                    </View>
                    
                    <View
                        style={{
                            width: '100%',
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            gap: 10,
                        }}
                    >
                        
                        <IconButton
                            type='primary'
                            label='Sign Up'
                            iconName='arrow-forward-circle-outline'
                            onPress={() => setModal('SIGNUP_DRIVER')}
                            alignIcon='right'
                        />

                        <IconButton
                            label='Preview'
                            iconName='eye-outline'
                            onPress={() => onConnect('driver')}
                            alignIcon='right'
                            transparent
                        />

                    </View>
                </View>
            </View>

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