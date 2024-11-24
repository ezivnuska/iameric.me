import React, { useMemo } from 'react'
import {
    Image,
    Pressable,
    View,
} from 'react-native'
import { IconButton, ThemedText } from '@components'
import { useUser } from '@user'
import { useModal } from '@modal'
import { navigate } from '@utils/navigation'

const IMAGE_PATH = __DEV__ ? 'https://iameric.me/assets' : '/assets'

export default ({ item, onDelete = null }) => {

    const { user } = useUser()
    const { setModal } = useModal()

    const getProfileImagePathFromUser = contact => {
        return contact && contact.profileImage
            ? `${IMAGE_PATH}/${contact.username}/${contact.profileImage.filename}`
            : `${IMAGE_PATH}/avatar-default-small.png`}
    
    const otherUser = item.to._id === user._id ? item.from : item.to
    const imagePath = getProfileImagePathFromUser(otherUser)
    
    return (
        <View
            style={{
                flexDirection: 'row',
                alignItems: 'flex-start',
                gap: 10,
                paddingVertical: 5,
                borderBottomWidth: 1,
                borderBottomColor: '#aaa',
            }}
        >
            <Pressable
                onPress={() => navigate('Contacts', { screen: 'Contact', params: { username: otherUser().username } })}
                style={{
                    flexGrow: 0,
                    borderRadius: 12,
                    overflow: 'hidden',
                    borderWidth: 1,
                }}
            >
                <Image
                    source={imagePath}
                    style={{
                        width: 24,
                        height: 24,
                    }}
                />
            </Pressable>
            
            <View style={{ flexGrow: 1 }}>
                <ThemedText style={{ lineHeight: 24 }}>{item.text}</ThemedText>
            </View>

            <View
                style={{
                    flexGrow: 0,
                    flexDirection: 'row',
                    alignItems: 'flex-start',
                    justifyContent: 'space-between',
                    flexWrap: 'wrap',
                    gap: 10,
                }}
            >
                
                {user._id === item.to._id && (
                    <IconButton
                        name='chatbox-ellipses-outline'
                        size={22}
                        onPress={() => setModal('MESSAGE', item.from)}
                    />
                )}

                {(user._id === item.from._id || user.role === 'admin') && (
                    <IconButton
                        name='trash-outline'
                        size={22}
                        color={user.role === 'admin' ? 'purple' : '#000'}
                        onPress={onDelete}
                    />
                )}

            </View>

        </View>
    )
}