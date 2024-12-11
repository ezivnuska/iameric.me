import React from 'react'
import { View } from 'react-native'
import { IconButtonLarge, TextCopy } from '@components'
import { useUser } from '@context'

const ProfileNav = ({ navigation, contact = null }) => {

    const { user } = useUser()

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