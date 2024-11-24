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

        <ThemedText bold>
            {route.name}
        </ThemedText>

    </View>
)

export default Nav