import React from 'react'
import {
    Image,
    Pressable,
    View,
} from 'react-native'
import { ThemedText } from '@components'
import { useApp } from '@app'
import { useModal } from '@modal'
import Icon from 'react-native-vector-icons/Ionicons'

export default ({ item, imagePath, onPress, owner, onDelete = null, ...props }) => {

    const { theme } = useApp()
    const { setModal } = useModal()

    return (
        <View
            style={{
                flexDirection: 'row',
                alignItems: 'flex-start',
                gap: 10,
                paddingLeft: 3,
                paddingTop: 7,
                borderBottomWidth: 1,
                borderBottomColor: '#aaa',
            }}
            {...props}
        >
            <View style={{ flexGrow: 0 }}>
                <ThemedText bold>{item.from.username}:</ThemedText>
                {/* <Image
                    style={{
                        width: 30,
                        height: 30,
                    }}
                    source={imagePath}
                /> */}
            </View>

            <View style={{ flex: 1, paddingBottom: 7 }}>
                <ThemedText>{item.text}</ThemedText>
            </View>

            <View
                style={{
                    flexGrow: 0,
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    flexWrap: 'wrap',
                }}
            >

                {owner ? (
                    <Pressable
                        onPress={onDelete}
                        style={{ padding: 5 }}
                    >
                        <Icon
                            name='trash-outline'
                            size={16}
                            color={theme?.colors.textDefault}
                        />
                    </Pressable>
                ) : (
                    <Pressable
                        onPress={() => setModal('MESSAGE', item.from)}
                        style={{ padding: 5 }}
                    >
                        <Icon
                            name='chatbox-ellipses-outline'
                            size={16}
                            color={theme?.colors.textDefault}
                        />
                    </Pressable>
                )}

            </View>

        </View>
    )
}