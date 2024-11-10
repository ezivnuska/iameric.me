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
const HEADER_HEIGHT = 50

export default ({ user, route }) => {

    const { dims } = useApp()

    const { setModal } = useModal()

    const renderBrand = () => dims.width < 340 ? 'iam' : 'iameric'

    return (
        <View
            style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                gap: 10,
                height: HEADER_HEIGHT,
                width: '100%',
                minWidth: 300,
                maxWidth: 400,
                paddingHorizontal: 10,
                marginHorizontal: 'auto',
            }}
        >
            <View style={{ flexGrow: 0 }}>

                <Pressable
                    onPress={() => navigate('Home')}
                >

                    <ThemedText bold style={{ fontSize: 24 }}>
                        {renderBrand()}
                    </ThemedText>

                </Pressable>

            </View>

            <View style={{ flexGrow: 0 }}>

                {user ? (
                    <Pressable
                        onPress={() => navigate('User', { screen: 'Profile' })}
                        style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                            gap: 10,
                        }}
                    >
                        <ProfileImage user={user} size={24} />

                        <ThemedText>{user.username}</ThemedText>
                        
                    </Pressable>
                ) : (
                    <SimpleButton
                        label='Sign In'
                        onPress={() => setModal('AUTH')}
                    />
                )}
            </View>

        </View>
    )
}