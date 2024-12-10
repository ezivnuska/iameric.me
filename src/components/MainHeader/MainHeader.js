import React from 'react'
import { Pressable, View } from 'react-native'
import { ProfileImage, SimpleButton, DefaultText } from '..'
import { useModal } from '@context'
import { navigate } from '@utils/navigation'

const HEADER_HEIGHT = 70

const MainHeader = ({ user, route }) => {

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
                <DefaultText bold style={{ fontSize: 50, lineHeight: 60 }}>iam</DefaultText>
            </Pressable>

            <Pressable
                onPress={() => navigate('User')}
                style={{ flexDirection: 'row', alignItems: 'center', gap: 10 }}
            >
                <DefaultText bold style={{ fontSize: 50, lineHeight: 60 }} color='tomato'>{user.username}</DefaultText>

                {user && <ProfileImage size={40} />}

            </Pressable>
            
        </View>
    ) : (
        <Pressable
            onPress={() => navigate('Home')}
            style={{ flexDirection: 'row', alignItems: 'center', gap: 3 }}
        >
            <DefaultText bold color='#000' style={{ fontSize: 50, lineHeight: 60 }}>iam</DefaultText>
            <DefaultText bold color='#999' style={{ fontSize: 50, lineHeight: 60 }}>eric</DefaultText>
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

export default MainHeader