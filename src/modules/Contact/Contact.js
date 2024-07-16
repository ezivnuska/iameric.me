import React from 'react'
import {
    Image,
    Pressable,
    View,
} from 'react-native'
import { ContactHeader } from './components'
import { useApp } from '@app'
import { useModal } from '@modal'

const IMAGE_PATH = __DEV__ ? 'https://iameric.me/assets' : '/assets'

export default ({ contact }) => {

    const { theme } = useApp()
    const { setModal } = useModal()

    const source = contact.profileImage
        ? `${IMAGE_PATH}/${contact.username}/${contact.profileImage.filename}`
        : `${IMAGE_PATH}/avatar-default.png`

    return (
        <View>
            <ContactHeader title={contact.username} />
            <Pressable
                onPress={() => setModal('SHOWCASE', contact.profileImage._id)}
            >
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
            </Pressable>

        </View>
    )
}