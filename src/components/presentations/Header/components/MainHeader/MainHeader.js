import React from 'react'
import { Pressable, View } from 'react-native'
import { ProfileImage, SimpleButton, TextCopy } from '@components'
import { useModal } from '@context'
import { navigate } from '@utils/navigation'

const MainHeader = ({ user, landscape = false }) => {

    const { setModal } = useModal()

    const renderBrand = () => user ? (
        <View
            style={{
                flexDirection: 'row',
                justifyContent: 'flex-start',
                alignItems: 'flex-start',
                gap: 3
            }}
        >
            <Pressable onPress={() => navigate('Home')}>
                <TextCopy bold style={{ fontSize: 40, lineHeight: 50 }}>iam</TextCopy>
            </Pressable>

            <Pressable
                onPress={() => navigate('User', { screen: 'Profile', params: { username: user.username } })}
                style={{
                    flexDirection: 'row',
                    justifyContent: 'flex-start',
                    alignItems: 'center',
                    gap: 10,
                }}
            >
                <TextCopy bold style={{ fontSize: 40, lineHeight: 50 }} color='tomato'>{user.username}</TextCopy>

                <ProfileImage size={40} />

            </Pressable>
            
        </View>
    ) : (
        <Pressable
            onPress={() => navigate('Home')}
            style={{ flexDirection: 'row', alignItems: 'center', gap: 3 }}
        >
            <TextCopy bold color='#000' style={{ fontSize: 40, lineHeight: 50 }}>iam</TextCopy>
            <TextCopy bold color='#999' style={{ fontSize: 40, lineHeight: 50 }}>eric</TextCopy>
        </Pressable>
    )

    return (
        <View
            style={{
                paddingHorizontal: 10,
                flexDirection: 'row',
                justifyContent: 'flex-start',
                alignItems: 'center',
                gap: 10,
            }}
        >
            <View
                style={{ flexGrow: 1 }}
            >
                {renderBrand()}
            </View>

            {
                !user && (
                    <SimpleButton
                        label='Sign In'
                        onPress={() => setModal('AUTH')}
                    />
                )
            }

        </View>
    )
}

export default MainHeader