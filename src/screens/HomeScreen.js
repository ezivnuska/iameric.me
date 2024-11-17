import React, { useEffect, useMemo, useState } from 'react'
import {
    Pressable,
    Text,
    View,
} from 'react-native'
import { Screen } from './components'
import {
    ThemedText,
} from '@components'
import { BipMap } from '@modules'
import { useApp } from '@app'
import { useUser } from '@user'
import { useModal } from '@modal'
import { useSocket } from '@socket'
import { signin, signout } from '@utils/auth'
import { cleanStorage, setItem, storeToken } from '@utils/storage'
import { destroy } from '@utils'

const HomeScreen = props => {
    const { params } = props.route

    const { authRoute, setAuthRoute } = useApp()
    const { reset, user, setUser } = useUser()
    const { clearModal, setModal } = useModal()
    const { notifySocket } = useSocket()

    const handleSignin = async (email, password) => {
        const response = await signin(email, password)
        if (!response) console.log('could not sign in user with params')
        else {
            setItem('email', response.email)
            storeToken(response.token)
            setUser(response)
            notifySocket('user_signed_in', {
                userId: response._id,
                username: response.username,
            })
        }
    }

    useEffect(() => {
        if (params) {
            if (!user) {
                if (params.email && params.password) {
                    handleSignin(params.email, params.password)
                }
            } else if (params.signout) {
                handleSignout()
            } else if (params.destroy) {
                handleDestroy()
            }
        }
    }, [params])

    useEffect(() => {
        if (authRoute) {
            console.log('AUTHORIZATION NEEDED FOR', authRoute)
            setModal('AUTH')
        }
    }, [authRoute])

    useEffect(() => {
        if (user) {
            if (authRoute) {
                const routeName = authRoute
                setAuthRoute(null)
                props.navigation.navigate(routeName)
            }
        }
    }, [user])

    const handleSignout = async () => {
        if (params.signout && user) {
            const userId = user._id
            await signout(userId)
            notifySocket('user_signed_out', userId)
            cleanStorage()
            reset()
            clearModal()
        }
        props.navigation.navigate('Home')
    }

    const handleDestroy = async () => {
        if (params.destroy && user) {
            const userId = user._id
            await signout(userId)
            const { id } = await destroy(userId)
            notifySocket('user_signed_out', id)
            cleanStorage()
            reset()
            clearModal()
        }
        props.navigation.navigate('Home')
    }

    return (
        <Screen {...props}>
            
            <View style={{ flex: 1, paddingHorizontal: 10 }}>

                <View style={{ flexGrow: 0 }}>
                    <Intro />
                </View>

                <View style={{ flexGrow: 1 }}>
                    <FatButtonNav
                        numCols={3}
                        navigateTo={props.navigation.navigate}
                    />
                </View>
                
            </View>

        </Screen>
    )
}

const FatButton = ({ label, size, onPress }) => (
    <Pressable
        onPress={onPress}
        style={{
            width: size,
            height: size,
        }}
    >
        <View
            style={{
                flex: 1,
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
                margin: 1,
                backgroundColor: 'tomato',
                // borderWidth: 1,
                // borderColor: '#303',
                borderRadius: 4,
                overflow: 'hidden',
            }}
        >
            <Text
                style={{
                    color: '#fff',
                    fontSize: 20,
                    fontWeight: 700,
                    textAlign: 'center',
                }}
            >
                {label}
            </Text>

        </View>
    </Pressable>
)

const FatButtonNav = ({ navigateTo, numCols = 2 }) => {

    const [maxWidth, setMaxWidth] = useState(null)
    const buttonSize = useMemo(() => maxWidth && maxWidth / numCols, [maxWidth])

    const onLayout = e => {
        if (e.nativeEvent.target.offsetParent) {
            setMaxWidth(e.nativeEvent.target.offsetParent.clientWidth)
        }
    }

    return (
        <View
            onLayout={onLayout}
            style={{
                flex: 1,
            }}
        >
            {maxWidth && (
                <View
                    style={{
                        flexDirection:'row',
                        flexWrap: 'wrap',
                    }}
                >
                    {/* <FatButton
                        label='Bips'
                        size={buttonSize}
                        onPress={() => navigateTo('Bips')}
                    /> */}

                    <FatButton
                        label='Users'
                        size={buttonSize}
                        onPress={() => navigateTo('Contacts')}
                    />

                    <FatButton
                        label='Work'
                        size={buttonSize}
                        onPress={() => navigateTo('Work')}
                    />

                    <FatButton
                        label='Play'
                        size={buttonSize}
                        onPress={() => navigateTo('Play')}
                    />

                    <FatButton
                        label='Simple'
                        size={buttonSize}
                        onPress={() => navigateTo('Simple')}
                    />

                    <FatButton
                        label='Forum'
                        size={buttonSize}
                        onPress={() => navigateTo('Forum')}
                    />

                    <FatButton
                        label='Feed'
                        size={buttonSize}
                        onPress={() => navigateTo('Feed')}
                    />

                </View>
            )}
        </View>
    )
}


const Intro = () => (
    <View
        style={{
            marginVertical: 10,
        }}
    >
        <View
            style={{
                flexDirection: 'row',
                gap: 7,
            }}
        >
            <View style={{ flexGrow: 0, flexDirection: 'row', gap: 5 }}>
                <ThemedText bold size={18}>I am</ThemedText>
                <View style={{ flexGrow: 0, flexDirection: 'row' }}>
                    <ThemedText bold size={18} color='#777'>Eric</ThemedText>
                    <ThemedText bold size={18}>.</ThemedText>
                </View>
            </View>

            <View style={{ flexGrow: 0 }}>
                <ThemedText size={18}>Welcome to my progress.</ThemedText>
            </View>
        </View>
    </View>
)

export default HomeScreen