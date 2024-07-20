import React, { useMemo } from 'react'
import {
    Image,
    View,
} from 'react-native'
import { IconButton, ThemedText } from '@components'
import { useApp } from '@app'
import { useModal } from '@modal'

const IMAGE_PATH = __DEV__ ? 'https://iameric.me/assets' : '/assets'

export default ({ item, onDelete = null, ...props }) => {

    const { user } = useApp()
    const { setModal } = useModal()

    const getProfileImagePathFromUser = contact => {
        return contact.profileImage
            ? `${IMAGE_PATH}/${contact.username}/${contact.profileImage.filename}`
            : `${IMAGE_PATH}/avatar-default-small.png`}

    const imagePath = useMemo(() => getProfileImagePathFromUser(item.to._id === user._id ? item.from : item.to), [item, user])

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
            {...props}
        >
            <View style={{ flexGrow: 0 }}>
                <View
                    style={{
                        flexDirection: 'row',
                        alignItems: 'flex-start',
                        gap: 10,
                    }}
                >
                    <View
                        style={{
                            borderRadius: 12,
                            overflow: 'hidden',
                        }}
                    >
                        <Image
                            source={imagePath}
                            style={{
                                width: 24,
                                height: 24,
                            }}
                        />
                    </View>
                    {/* <ThemedText bold style={{ lineHeight: 24 }}>{item.from.username}:</ThemedText> */}
                </View>
            </View>

            <ThemedText style={{ flexGrow: 1, lineHeight: 24 }}>{item.text}</ThemedText>

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
                        onPress={() => setModal('MESSAGE', item.from)}
                    />
                )}

                {(user._id === item.from._id || user.role === 'admin') && (
                    <IconButton
                        name='trash-outline'
                        onPress={onDelete}
                    />
                )}

            </View>

        </View>
    )
}