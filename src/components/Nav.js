import React from 'react'
import { Pressable, View } from 'react-native'
import { ThemedText } from '.'

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
                <ThemedText bold color='tomato'>
                    {root}
                </ThemedText>

            </Pressable>
        )}

        {route.name === 'Contact' && (
            <ThemedText bold>
                {route.params.username}
            </ThemedText>
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
                    <ThemedText bold color='tomato'>
                        {route.params.username}
                    </ThemedText>

                </Pressable>
            )
        }

        {route.name === 'Images' && (
            <ThemedText bold>
                Images
            </ThemedText>
        )}

    </View>
)

export default Nav