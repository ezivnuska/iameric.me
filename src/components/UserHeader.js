import React from 'react'
import { Pressable, View } from 'react-native'
import { IconButtonLarge, ThemedText } from '@components'
import navigationRef from '@utils/navigation'

const UserHeader = ({ user, route }) => {

    return (
        <View
            style={{
                flexGrow: 0,
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                gap: 10,
                marginBottom: 10,
                paddingHorizontal: 10,
            }}
        >
            <Pressable
                onPress={() => navigationRef.navigate('Profile')}
                disabled={route.name === 'Profile'}
                style={{ flexGrow: 0 }}
            >
                <ThemedText
                    bold
                    size={36}
                    color={route.name === 'Profile' ? '#000' : 'tomato'}
                >
                    {user.username}
                </ThemedText>
            </Pressable>
    
            {/* <IconButtonLarge
                label='Images'
                name='images'
                size={24}
                color='#000'
                transparent={route.name === 'Images'}
                onPress={() => navigationRef.navigate('Images')}
                disabled={route.name === 'Images'}
            /> */}
    
        </View>
    )
}

export default UserHeader