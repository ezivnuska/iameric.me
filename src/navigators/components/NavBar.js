import React from 'react'
import { Pressable, View } from 'react-native'
import { DefaultText, IconButton } from '@components'
import { useModal } from '@context'
import { useUser } from '@context'

const NavBar = ({ root, navigation, route }) => {

    const { uploading, user } = useUser()

    const { setModal } = useModal()

    return (
        <View
            style={{
                flexDirection: 'row',
                justifyContent: route.name === 'Images' ? 'space-between' : 'flex-start',
                alignItems: 'center',
                paddingHorizontal: 10,
                height: 50,
                gap: 10,
            }}
        >

            <View
                style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                }}
            >
                
                <Pressable
                    onPress={() => navigation.navigate(root)}
                    disabled={route.name === root}
                    style={{ paddingRight: 10 }}
                >
                    <DefaultText
                        size={24}
                        color={route.name !== root ? 'tomato' : 'rgba(0, 0, 0, 0.75)'}
                        bold
                    >
                        {root === 'Profile' ? user?.username : root}
                    </DefaultText>

                </Pressable>

                {/* if Contact screen... */}

                {(route.name === 'Contact') && (
                    <View
                        style={{
                            paddingHorizontal: 10,
                            borderLeftWidth: 1,
                            borderLeftColor: 'rgba(0, 0, 0, 0.5)',
                        }}
                    >
                        <DefaultText
                            size={24}
                            bold
                            color='rgba(0, 0, 0, 0.75)'
                            
                        >
                            {route.params?.username || user?.username}
                        </DefaultText>
                    </View>
                )}

                {/* if Images screen... */}

                {(route.params?.username && route.name === 'Images') && (
                    <Pressable
                        onPress={() => navigation.navigate('Contact', { username: route.params?.username })}
                        disabled={route.name === 'Contact'}
                        style={{
                            paddingHorizontal: 10,
                            borderLeftWidth: 1,
                            borderLeftColor: 'rgba(0, 0, 0, 0.5)',
                        }}
                    >
                        <DefaultText
                            size={24}
                            color={route.name === 'Contact' ? 'rgba(0, 0, 0, 0.75)' : 'tomato'}
                            bold
                        >
                            {route.params?.username}
                        </DefaultText>

                    </Pressable>
                )}

                {route.name === 'Images' && (
                    <View
                        style={{
                            paddingHorizontal: 10,
                            borderLeftWidth: 1,
                            borderLeftColor: 'rgba(0, 0, 0, 0.5)',
                        }}
                    >
                        <DefaultText
                            size={24}
                            bold
                            color='rgba(0, 0, 0, 0.75)'
                        >
                            Images
                        </DefaultText>
                    </View>
                )}

            </View>

            {route.name === 'Images' && (
                <View
                    style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        // height: 40,
                        // gap: 15,
                    }}
                >
                    {root === 'Profile' && (
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
                        onPress={() => navigation.navigate('Images', {
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
                        onPress={() => navigation.navigate('Images', {
                            username: route.params?.username,
                            list: true,
                        })}
                        color={route.params?.list ? 'rgba(0, 0, 0, 0.75)' : 'tomato'}
                        size={30}
                        disabled={route.params?.list}
                        // style={{
                        //     paddingLeft: 10,
                        //     borderLeftWidth: 1,
                        //     borderLeftColor: 'rgba(0, 0, 0, 0.75)',
                        // }}
                    />
                </View>
            )}
        </View>
    )
}
export default NavBar