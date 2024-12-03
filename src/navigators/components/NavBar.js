import React from 'react'
import { Pressable, View } from 'react-native'
import { DefaultText, IconButton } from '@components'
import { useUser } from '@user'

const NavBar = ({ root, navigation, route }) => {

    const { user } = useUser()

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
                        size={20}
                        color={route.name !== root ? 'tomato' : 'rgba(0, 0, 0, 0.75)'}
                        bold
                    >
                        {root === 'Profile' ? user.username : root}
                    </DefaultText>

                </Pressable>

                {/* if Contact screen... */}

                {(route.name === 'Contact') && (
                    <View
                        style={{
                            paddingHorizontal: 10,
                            borderLeftWidth: 1,
                            borderLeftColor: 'rgba(0, 0, 0, 0.74)',
                        }}
                    >
                        <DefaultText
                            size={20}
                            bold
                            color='rgba(0, 0, 0, 0.75)'
                            
                        >
                            {route.params?.username || user.username}
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
                            borderLeftColor: 'rgba(0, 0, 0, 0.74)',
                        }}
                    >
                        <DefaultText
                            size={20}
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
                            borderLeftColor: 'rgba(0, 0, 0, 0.74)',
                        }}
                    >
                        <DefaultText
                            size={20}
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
                        height: 40,
                        gap: 15,
                    }}
                >
                    <IconButton
                        name='grid-outline'
                        onPress={() => navigation.navigate('Images', {
                            username: route.params?.username,
                            list: false,
                        })}
                        color={route.params?.list ? 'tomato' : 'rgba(0, 0, 0, 0.75)'}
                        size={22}
                        disabled={!route.params?.list}
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
                        style={{ paddingTop: 3 }}
                    />
                </View>
            )}
        </View>
    )
}
export default NavBar