import React from 'react'
import {
    Pressable,
    View,
} from 'react-native'
import {
    IconButton,
    ThemedText,
} from '@components'

const UserHeader = ({ username, ...props }) => {
    
    return (
        <View
            style={{
                flexGrow: 0,
                flexDirection: 'row',
                justifyContent: 'flex-start',
                alignItems: 'center',
                gap: 20,
                marginBottom: 10,
            }}
        >
            <Pressable
                onPress={() => props.navigation.navigate('Profile')}
                disabled={props.route.name === 'Profile'}
                style={{ flexGrow: 0 }}
            >
                <ThemedText
                    size={22}
                    color={props.route.name === 'Profile' ? 'tomato' : '#000'}
                    bold
                >
                    {username}
                </ThemedText>
            </Pressable>

            <View
                style={{
                    flexGrow: 1,
                    flexDirection: 'row',
                    alignItems: 'center',
                    gap: 20,
                }}
            >
                <IconButton
                    name='images-sharp'
                    size={22}
                    onPress={() => props.navigation.navigate('Images')}
                    disabled={props.route.name === 'Images'}
                />

            </View>
        </View>
    )
}

export default UserHeader