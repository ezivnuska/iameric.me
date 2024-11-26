import React from 'react'
import { Pressable, View } from 'react-native'
import { DefaultText } from '@components'

const Nav = ({ root, navigation, route }) => (
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
)

export default Nav