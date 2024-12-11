import React from 'react'
import { Pressable, View } from 'react-native'
import { TextCopy, IconButton } from '@components'
import { useModal, useUser } from '@context'
import { navigate } from '@utils/navigation'

const UserNavBar = ({ route }) => {

    const { uploading, user } = useUser()
    const { setModal } = useModal()

    const isCurrentUser = user.username === route.params?.username
    
    return (
        <View
            style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                paddingRight: 10,
                gap: 10,
            }}
        >
            <View
                style={{
                    flexDirection: 'row',
                    justifyContent: 'flex-start',
                    alignItems: 'center',
                }}
            >
                {!isCurrentUser && (
                    <Pressable
                        onPress={() => navigate('Users')}
                        disabled={route.name === 'Users'}
                        style={{
                            paddingHorizontal: 10,
                            borderRightWidth: 1,
                            borderRightColor: 'rgba(0, 0, 0, 0.5)',
                        }}
                    >
                        <TextCopy
                            size={24}
                            color={route.name !== 'Users' ? 'tomato' : 'rgba(0, 0, 0, 0.75)'}
                            bold
                        >
                            Users
                        </TextCopy>

                    </Pressable>
                )}

                <Pressable
                    onPress={() => navigate('Profile', { username: route.params?.username })}
                    disabled={route.name === 'Profile'}
                    style={{ paddingHorizontal: 10 }}
                >
                    <TextCopy
                        size={24}
                        color={route.name === 'Profile' ? 'rgba(0, 0, 0, 0.75)' : 'tomato'}
                        bold
                    >
                        {route.params?.username}
                    </TextCopy>

                </Pressable>

                {route.name === 'Images' && (
                    <View
                        style={{
                            paddingHorizontal: 10,
                            borderLeftWidth: 1,
                            borderLeftColor: 'rgba(0, 0, 0, 0.5)',
                        }}
                    >
                        <TextCopy
                            size={24}
                            bold
                            color='rgba(0, 0, 0, 0.75)'
                        >
                            Images
                        </TextCopy>
                    </View>
                )}
            </View>

            {route.name === 'Images' && (
                <View
                    style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                    }}
                >
                    {isCurrentUser && (
                        <IconButton
                            name='add-outline'
                            onPress={() => setModal('IMAGE_UPLOAD')}
                            color={!uploading ? 'tomato' : 'rgba(0, 0, 0, 0.75)'}
                            size={28}
                            disabled={uploading}
                            style={{
                                paddingHorizontal: 5,
                                borderRightWidth: 1,
                                borderRightColor: 'rgba(0, 0, 0, 0.5)',
                            }}
                        />
                    )}

                    <IconButton
                        name='grid-outline'
                        onPress={() => navigate('Images', {
                            username: route.params?.username,
                            list: false,
                        })}
                        color={route.params?.list ? 'tomato' : 'rgba(0, 0, 0, 0.75)'}
                        size={22}
                        disabled={!route.params?.list}
                        style={{
                            paddingHorizontal: 10,
                        }}
                    />

                    <IconButton
                        name='menu-outline'
                        onPress={() => navigate('Images', {
                            username: route.params?.username,
                            list: true,
                        })}
                        color={route.params?.list ? 'rgba(0, 0, 0, 0.75)' : 'tomato'}
                        size={30}
                        disabled={route.params?.list}
                    />
                </View>
            )}
        </View>
    )
}
export default UserNavBar