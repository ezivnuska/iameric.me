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

const HEADER_HEIGHT = 100

const Header = ({ user, route }) => {

    const { setModal } = useModal()

    const renderBrand = () => user ? (
        <View
            style={{
                flexDirection: 'row',
                alignItems: 'center',
                flexWrap: 'wrap',
                gap: 10
            }}
        >
            <Pressable onPress={() => navigate('Home')}>
                <ThemedText bold style={{ fontSize: 50, lineHeight: 60 }}>iam</ThemedText>
            </Pressable>
            <Pressable
                onPress={() => navigate('User', { screen: 'Profile' })}
                style={{ flexDirection: 'row', alignItems: 'center', gap: 10 }}
            >
                {user && <ProfileImage user={user} size={50} />}
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
                maxWidth: 400,
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

            {!user && (
                <SimpleButton
                    label='Sign In'
                    onPress={() => setModal('AUTH')}
                />
            )}

        </View>
    )
}

export default Header