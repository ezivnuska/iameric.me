import React from 'react'
import {
    Image,
    Pressable,
    View,
} from 'react-native'
import {
    ContactHeader,
    Images,
} from './components'
import { useApp } from '@app'
import { useModal } from '@modal'

const IMAGE_PATH = __DEV__ ? 'https://iameric.me/assets' : '/assets'

export default ({ contact }) => {

    const { theme } = useApp()
    const { setModal } = useModal()

    const source = contact && contact.profileImage
        ? `${IMAGE_PATH}/${contact.username}/${contact.profileImage.filename}`
        : `${IMAGE_PATH}/avatar-default.png`

    return contact ? (
        <View>
            
            <ContactHeader title={contact.username} />

            <Pressable
                onPress={() => setModal('SHOWCASE', contact.profileImage)}
                disabled={!contact.profileImage}
            >
                <Image
                    source={source}
                    resizeMode='cover'
                    style={{
                        width: 100,
                        height: 100,
                        borderWidth: 1,
                        borderColor: theme?.colors.textDefault,
                    }}
                />
            </Pressable>
            
            <View style={{ marginVertical: 20 }}>
                <Images contactId={contact._id} />
            </View>

        </View>
    ) : null
}