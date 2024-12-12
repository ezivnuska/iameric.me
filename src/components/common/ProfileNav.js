import React from 'react'
import { View } from 'react-native'
import { IconButtonLarge, TextCopy } from '@components'

const ProfileNav = ({ navigation, user, contact = null }) => {

    return (
        <View style={{ flexGrow: 0, gap: 10 }}>

            <TextCopy bold size={36}>
                {contact?.username || user.username}
            </TextCopy>
    
            <IconButtonLarge
                name='images'
                label='Images'
                size={34}
                transparent
                onPress={() => {
                    const nextParams = contact ? { username: contact.username } : null
                    navigation.navigate('Images', nextParams)}
                }
            />
    
        </View>
    )
}

export default ProfileNav