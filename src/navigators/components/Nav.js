import React from 'react'
import { Pressable, View } from 'react-native'
import { DefaultText, IconButton } from '@components'

const Nav = ({ root, navigation, route }) => (
    <View
        style={{
            marginBottom: 20,
            paddingHorizontal: 10,
            flexDirection: 'row',
            justifyContent: route.name === 'Images' ? 'space-between' : 'flex-start',
            alignItems: 'center',
            gap: 10,
        }}
    >

        <View
            style={{
                marginBottom: 20,
                paddingHorizontal: 10,
                flexDirection: 'row',
                alignItems: 'center',
                gap: 10,
            }}
        >
            {(route.name !== root) && (
                <Pressable
                    onPress={() => navigation.navigate(root, route.params)}
                    style={{
                        paddingRight: 10,
                        borderRightWidth: 1,
                        borderRightColor: '#ccc',
                    }}
                >
                    <DefaultText bold color='tomato'>
                        {root}
                    </DefaultText>

                </Pressable>
            )}

            {route.name === 'Contact' && (
                <DefaultText bold>
                    {route.params.username}
                </DefaultText>
            )}

            {route.name === 'Images' && route.params?.username
                && (
                    <Pressable
                        onPress={() => navigation.navigate('Contact', route.params)}
                        disabled={route.name === 'Contact'}
                        style={{
                            paddingRight: 10,
                            borderRightWidth: 1,
                            borderRightColor: '#ccc',
                        }}
                    >
                        <DefaultText bold color='tomato'>
                            {route.params.username}
                        </DefaultText>

                    </Pressable>
                )
            }

            {route.name === 'Images' && (
                <DefaultText bold>
                    Images
                </DefaultText>
            )}

        </View>

        {route.name === 'Images' && (
            <View
                style={{
                    marginBottom: 20,
                    paddingHorizontal: 10,
                    flexDirection: 'row',
                    alignItems: 'center',
                    gap: 10,
                }}
            >
                <IconButton
                    name='grid-outline'
                    onPress={() => navigation.navigate('Images', { ...route.params, type: 'grid' })}
                    color={route.params?.type && route.params.type !== 'grid' ? 'tomato' : '#000'}
                />

                <IconButton
                    name='menu-outline'
                    onPress={() => navigation.navigate('Images', { ...route.params, type: 'list' })}
                    color={!route.params?.type || route.params.type !== 'list' ? 'tomato' : '#000'}
                />
            </View>
        )}
    </View>
)

export default Nav