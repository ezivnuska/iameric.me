import React, { useEffect, useMemo, useState } from 'react'
import {
    Image,
    Pressable,
    View,
} from 'react-native'
import { ThemedText } from '@components'
import { useApp } from '@app'
import { useModal } from '@modal'
import { useSocket } from '@socket'
import Icon from 'react-native-vector-icons/Ionicons'

export default ({ item, imagePath, onPress, owner, onDelete = null, ...props }) => {
    
    const { author, text } = item

    const { theme } = useApp()
    const { setModal } = useModal()
    const { connections } = useSocket()

    const isOnline = useMemo(() => {
        const connectionIds = connections.map(c => c.userId)
        return connectionIds.indexOf(author._id) > -1
    }, [author, connections])

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
                <ThemedText bold>{author.username}:</ThemedText>
                {/* <Image
                    style={{
                        width: 30,
                        height: 30,
                    }}
                    source={imagePath}
                /> */}
            </View>

            <View style={{ flex: 1, paddingBottom: 7 }}>
                <ThemedText>{text}</ThemedText>
            </View>

            <View
                style={{
                    flexGrow: 0,
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    flexWrap: 'wrap',
                }}
            >
                
                <Pressable
                    onPress={() => setModal('FEEDBACK', item)}
                    style={{ padding: 5 }}
                >
                    <Icon
                        name='chatbox-ellipses-outline'
                        size={16}
                        color={theme?.colors.textDefault}
                    />
                </Pressable>
            
                {owner && (
                    <Pressable
                        onPress={() => onDelete(item._id)}
                        style={{ padding: 5 }}
                    >
                        <Icon
                            name='trash-outline'
                            size={16}
                            color={theme?.colors.textDefault}
                        />
                    </Pressable>
                )}

            </View>

        </View>
    )
}