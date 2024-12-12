import React from 'react'
import { Pressable, View } from 'react-native'
import { IconButton, ProfileImage, SimpleButton, TextCopy, TextPressable } from '@components'
import { useModal } from '@context'
import { navigate } from '@utils/navigation'

const MainHeader = ({ landscape, size, user }) => {

    const { setModal } = useModal()

    const renderBrand = () => {
        return (
            <View style={{ flexGrow: 0 }}>

                {user ? (
                    <View
                        style={{
                            flexGrow: 1,
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            gap: 3,
                        }}
                    >
                        <TextPressable
                            onPress={() => navigate('Home')}
                            size={size}
                            bold
                            color='#000'
                        >
                            iam
                        </TextPressable>

                        <Pressable
                            onPress={() => navigate('User', { screen: 'Profile', params: { username: user.username } })}
                            style={{
                                flexDirection: 'row',
                                justifyContent: 'flex-start',
                                alignItems: 'center',
                                gap: 15,
                            }}
                        >
                            <TextCopy
                                bold
                                size={size}
                                color='tomato'
                            >
                                {user.username}
                            </TextCopy>

                            <ProfileImage user={user} size={40} />

                        </Pressable>
                        
                    </View>
                ) : (
                    <Pressable
                        onPress={() => navigate('Home')}
                        style={{ flexDirection: 'row', alignItems: 'center', gap: 3 }}
                    >
                        <TextCopy
                            bold
                            color='#000'
                            size={size}
                        >
                            iam
                        </TextCopy>

                        <TextCopy
                            bold
                            color='#999'
                            size={size}
                        >
                            eric
                        </TextCopy>

                    </Pressable>
                )}
            </View>
        )
    }

    return (
        <View
            style={{
                flex: 1,
                paddingHorizontal: 10,
                flexDirection: 'row',
                alignItems: 'center',
                gap: 20,
            }}
        >
            {renderBrand()}

            {user ? (
                <View
                    style={{
                        flexGrow: 1,
                        flexDirection: 'row',
                        justifyContent: landscape ? 'center' : 'flex-end',
                        alignItems: 'center',
                        gap: 20,
                    }}
                >

                    <IconButton
                        name='people-outline'
                        onPress={() => navigate('Users')}
                    />

                    <IconButton
                        name='build-outline'
                        onPress={() => navigate('Work')}
                    />

                    <IconButton
                        name='list-outline'
                        onPress={() => navigate('Feed')}
                    />

                </View>
            ) : (
                <SimpleButton
                    label='Sign In'
                    onPress={() => setModal('AUTH')}
                />
            )}

        </View>
    )
}

export default MainHeader