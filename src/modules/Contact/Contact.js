import React from 'react'
import {
    Image,
    View,
} from 'react-native'
import { ContactHeader } from './components'
import { useApp } from '@app'

const IMAGE_PATH = __DEV__ ? 'https://iameric.me/assets' : '/assets'

export default ({ contact }) => {

    const { theme } = useApp()

    const source = contact.profileImage
        ? `${IMAGE_PATH}/${contact.username}/${contact.profileImage.filename}`
        : `${IMAGE_PATH}/avatar-default.png`

    return (
        <View>
            <ContactHeader title={contact.username} />
            
            <View style={{ flexGrow: 1 }}>
                <Image
                    source={source}
                    style={{
                        width: 100,
                        height: 100,
                        resizeMode: 'cover',
                        borderWidth: 1,
                        borderColor: theme?.colors.textDefault,
                    }}
                />
            </View>

        </View>
    )
}