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

const HEADER_HEIGHT = 70

const Header = ({ user, route }) => {

    const { setModal } = useModal()

    const renderBrand = () => user ? (
        <View
            style={{
                flexDirection: 'row',
                alignItems: 'center',
                flexWrap: 'wrap',
                gap: 3
            }}
        >
            <Pressable onPress={() => navigate('Home')}>
                <ThemedText bold style={{ fontSize: 50, lineHeight: 60 }}>iam</ThemedText>
            </Pressable>

            <Pressable
                onPress={() => navigate('User', { screen: 'Profile' })}
                style={{ flexDirection: 'row', alignItems: 'center', gap: 10 }}
            >
                <ThemedText bold style={{ fontSize: 50, lineHeight: 60 }} color='tomato'>{user.username}</ThemedText>

                {user && <ProfileImage user={user} size={40} />}

            </Pressable>
            
        </View>
    ) : (
        <Pressable
            onPress={() => navigate('Home')}
            style={{ flexDirection: 'row', alignItems: 'center', gap: 3 }}
        >
            <ThemedText bold color='#000' style={{ fontSize: 50, lineHeight: 60 }}>iam</ThemedText>
            <ThemedText bold color='#999' style={{ fontSize: 50, lineHeight: 60 }}>eric</ThemedText>
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