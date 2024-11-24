import React from 'react'
import { View } from 'react-native'
import { IconButtonLarge, ThemedText } from '@components'
import { useUser } from '@user'

const ProfileNav = ({ navigation, contact = null }) => {

    const { user } = useUser()

    return (
        <View style={{ flexGrow: 0, gap: 10 }}>

            <ThemedText bold size={36}>
                {contact?.username || user.username}
            </ThemedText>
    
            <IconButtonLarge
                name='images'
                label='Images'
                size={24}
                onPress={() => {
                    const nextParams = contact ? { username: contact.username } : null
                    navigation.navigate('Images', nextParams)}
                }
            />
    
        </View>
    )
}

export default ProfileNav