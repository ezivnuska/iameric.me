import React from 'react'
import { View } from 'react-native'
import { IconButtonLarge, DefaultText } from '@components'
import { useUser } from '@user'

const ProfileNav = ({ navigation, contact = null }) => {

    const { user } = useUser()

    return (
        <View style={{ flexGrow: 0, gap: 10 }}>

            <DefaultText bold size={36}>
                {contact?.username || user.username}
            </DefaultText>
    
            <IconButtonLarge
                name='images'
                label='Images'
                size={34}
                transparent
                onPress={() => {
                    const nextParams = contact ? { username: contact.username } : null
                    console.log('navigating to', nextParams)
                    navigation.navigate('Images', nextParams)}
                }
            />
    
        </View>
    )
}

export default ProfileNav