import React from 'react'
import {
    Pressable,
    View,
} from 'react-native'
import {
    ProfileImage,
    SimpleButton,
    ThemedText,
} from '@components'
import { useModal } from '@modal'
import { navigate } from '@utils/navigation'

const HEADER_HEIGHT = 60

const Header = ({ user, route }) => {

    const { setModal } = useModal()

    const renderBrand = () => user ? (
        <View
            style={{
                flexDirection: 'row',
                alignItems: 'center',
                flexWrap: 'wrap',
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
                justifyContent: user ? 'flex-start' : 'space-between',
                alignItems: 'center',
                gap: 10,
                height: HEADER_HEIGHT,
                width: '100%',
                minWidth: 300,
                maxWidth: 375,
                marginHorizontal: 'auto',
                overflow: 'visible',
                paddingHorizontal: 10,
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

            {user ? (
                <Pressable
                    onPress={() => navigate('User', { screen: 'Profile' })}
                >
                    <ProfileImage user={user} size={40} />
                </Pressable>
            ) : (
                <SimpleButton
                    label='Sign In'
                    onPress={() => setModal('AUTH')}
                />
            )}

        </View>
    )
}

export default Header