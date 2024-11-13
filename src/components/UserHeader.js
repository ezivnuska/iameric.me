import React from 'react'
import {
    Pressable,
    View,
} from 'react-native'
import {
    IconButtonLarge,
    ThemedText,
} from '@components'

const UserHeader = ({ username, ...props }) => (
    <View
        style={{
            flexGrow: 0,
            flexDirection: 'row',
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
            <ThemedText
                bold
                size={36}
                color={props.route.name === 'Profile' ? '#000' : 'tomato'}
            >
                Profile
            </ThemedText>
        </Pressable>

        <IconButtonLarge
            name='images'
            size={24}
            onPress={() => props.navigation.navigate('Images')}
            disabled={props.route.name === 'Images'}
        />

    </View>
)

export default UserHeader