import React, { useMemo } from 'react'
import {
    Image,
    Pressable,
    View,
} from 'react-native'
import {
    IconButton,
    ProfileImage,
    SimpleButton,
    ThemedText,
} from '@components'
import { useApp } from '@app'
import { useModal } from '@modal'
import { navigate } from '@utils/navigation'

const IMAGE_PATH = __DEV__ ? 'https://iameric.me/assets' : '/assets'
const HEADER_HEIGHT = 60

export default ({ user, route }) => {

    const { dims } = useApp()

    const { setModal } = useModal()

    const renderBrand = () => user ? (
        <View
            style={{
                flexDirection: 'row',
                alignItems: 'center',
            }}
        >
            <Pressable onPress={() => navigate('Home')}>
                <ThemedText bold style={{ fontSize: 50, lineHeight: 60 }}>iam</ThemedText>
            </Pressable>
            <Pressable onPress={() => navigate('User', { screen: 'Profile' })}>
                <ThemedText bold style={{ fontSize: 50, lineHeight: 60 }} color='tomato'>{user.username}</ThemedText>
            </Pressable>
        </View>
    ) : (
        <Pressable onPress={() => navigate('Home')}>
            <ThemedText bold style={{ fontSize: 50, lineHeight: 60 }}>iameric</ThemedText>
        </Pressable>
    )

    return (
        <View
            style={{
                flexDirection: 'row',
                // justifyContent: user ? 'flex-start' : 'space-between',
                justifyContent: 'space-between',
                alignItems: 'flex-start',
                // alignItems: 'center',
                gap: 10,
                height: HEADER_HEIGHT,
                width: '100%',
                minWidth: 300,
                maxWidth: 400,
                paddingHorizontal: 10,
                marginHorizontal: 'auto',
                overflow: 'visible',
            }}
        >
            <View
                style={{
                    flexGrow: 0,
                    flexShrink: 1,
                }}
            >
                {renderBrand()}

            </View>

            <View
                style={{
                    flexGrow: 0,
                    flexShrink: 0,
                }}
            >

                <View style={{ paddingTop: 5 }}>
                    {user ? (
                        <Pressable
                            onPress={() => navigate('User', { screen: 'Profile' })}
                        >
                            <ProfileImage user={user} size={100} />
                        </Pressable>
                    ) : (
                        <SimpleButton
                            label='Sign In'
                            onPress={() => setModal('AUTH')}
                        />
                    )}
                </View>
            </View>

        </View>
    )
}