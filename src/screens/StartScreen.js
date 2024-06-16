import React from 'react'
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
    useProducts,
} from '@context'
import { connect } from '@utils/auth'
import LinearGradient from 'react-native-linear-gradient'
import { classes } from '@styles'
import {
    Display,
    Menu,
} from '@presentations'

export default props => {

    const { appLoaded, signIn, thin, userId } = useApp()
    const { setModal } = useModal()
    const { products, productsLoading } = useProducts()

    const onConnect = async type => {
        const user = await connect(type)
        if (!user) console.log('Error: Could not connect user.')
        else {
            await signIn(user)
            props.navigation.navigate('Main', { screen: 'Home' })
        }
    }

    const renderButtons = () => (
        <View style={{
            paddingVertical: 20,
            justifyContent: 'flex-start',
            gap: 10,
        }}>
            
            <IconButton
                label='Sign Up'
                iconName='arrow-forward-circle-outline'
                onPress={() => setModal('SIGNUP')}
                alignIcon='right'
                transparent
            />

            <IconButton
                type='primary'
                label='Private User Preview'
                iconName='eye-outline'
                onPress={() => onConnect('customer')}
                alignIcon='right'
                padded
            />

            <IconButton
                type='primary'
                label='Business Preview'
                iconName='eye-outline'
                onPress={() => onConnect('vendor')}
                alignIcon='right'
                padded
            />

        </View>
    )

    if (!appLoaded) return <LoadingView loading='App Loading...' />

    return (
        <Screen
            style={[classes.screen, classes.paddingH]}
            {...props}
        >

            <View
                style={{
                    flexDirection: 'row',
                    // justifyContent: 'space-between',
                    flexWrap: 'wrap',
                    gap: 10,
                }}
            >
                <View
                    style={{
                        flex: 1,
                        flexGrow: 0,
                        flexShrink: 1,
                        minWidth: !thin ? 100 : '100%',
                        maxWidth: 300,
                    }}
                >
                    <Display />
                </View>
                <View
                    style={{
                        flex: 1,
                        flexGrow: 1,
                        minWidth: 200,
                        maxWidth: 400,
                    }}
                >
                    <Menu products={products} loading={productsLoading} />
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
    )
}

// const ImageSegment = ({ children, source }) => {
    
//     const { theme } = useApp()

//     return (
//         <ImageBackground
//             style={{ flex: 1 }}
//             resizeMode='cover'
//             source={source}
//         >
//             <LinearGradient
//                 style={{
//                     flex: 1,
//                     flexDirection: 'row',
//                     alignItems: 'flex-end',
//                     justifyContent: 'space-between',
//                     paddingVertical: 10,
//                     paddingHorizontal: 5,
//                     opacity: 1,
//                 }}
//                 colors={theme?.dark
//                     ? [ '#00000000', '#000000' ]
//                     : [ '#00000000', '#000000' ]
//                 }
//             >

//                 {children}

//             </LinearGradient>

//         </ImageBackground>
//     )
// }