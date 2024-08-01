import React from 'react'
import {
    Pressable,
    View,
} from 'react-native'
import {
    IconButton,
    ThemedText,
} from '@components'

export default ({ username, ...props }) => {
    
    return (
        <View
            style={{
                flexGrow: 0,
                flexDirection: 'row',
                justifyContent: 'flex-start',
                alignItems: 'center',
                gap: 10,
                marginBottom: 10,
            }}
        >
            <Pressable
                onPress={() => props.navigation.navigate('Profile')}
                disabled={props.route.name === 'Profile'}
                style={{ flexGrow: 0 }}
            >
                <ThemedText bold size={20}>
                    {username}
                </ThemedText>
            </Pressable>

            <View
                style={{
                    flexGrow: 1,
                    flexDirection: 'row',
                    alignItems: 'center',
                    gap: 10,
                }}
            >
                <IconButton
                    name='images-sharp'
                    onPress={() => props.navigation.navigate('Images')}
                    disabled={props.route.name === 'Images'}
                />

                <IconButton
                    name='map-sharp'
                    onPress={() => props.navigation.navigate('Map')}
                    disabled={props.route.name === 'Map'}
                />
            </View>
        </View>
    )
}