import React from 'react'
import {
    Image,
    Pressable,
    View,
} from 'react-native'
import { ThemedText } from '@components'
import { useApp } from '@app'
import Icon from 'react-native-vector-icons/Ionicons'

export default ({ item, imagePath, onPress, owner, onDelete = null, ...props }) => {

    const { theme } = useApp()

    return (
        <View
            style={{
                flexDirection: 'row',
                alignItems: 'center',
                gap: 10,
                paddingLeft: 5,
                paddingVertical: 3,
                borderBottomWidth: 1,
                borderBottomColor: '#aaa',
            }}
            {...props}
        >
            <View style={{ flexGrow: 0 }}>
                <ThemedText bold>{item.from.username}:</ThemedText>
            </View>

            <View style={{ flex: 1 }}>
                <ThemedText>{item.text}</ThemedText>
            </View>

            {(owner && onDelete) && (
                <View style={{ flexGrow: 0 }}>

                    <Pressable
                        onPress={onDelete}
                        style={{ padding: 5 }}
                    >
                        <Icon
                            name='trash'
                            size={16}
                            color={theme?.colors.textDefault}
                        />
                    </Pressable>

                </View>
            )}

            {/* <View
                style={{
                    flexBasis: 'auto',
                    flexGrow: 0,
                }}
            >
                <Image
                    style={{
                        width: 30,
                        height: 30,
                    }}
                    source={imagePath}
                />
            </View> */}

        </View>
    )
}