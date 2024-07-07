import React, { useEffect, useMemo, useState } from 'react'
import {
    Image,
    Pressable,
    View,
} from 'react-native'
import { ThemedText } from '@components'
import { useApp } from '@app'
import { useSocket } from '@socket'
import Icon from 'react-native-vector-icons/Ionicons'

export default ({ item, imagePath, onPress, owner, onDelete = null, ...props }) => {
    
    const { author, text } = item

    const { theme } = useApp()
    const { connections } = useSocket()

    const isOnline = useMemo(() => {
        const connectionIds = connections.map(c => c.userId)
        return connectionIds.indexOf(author._id) > -1
    }, [author, connections])

    const renderHeader = () => (
        <View
            style={{
                flexDirection: 'row',
                justifyContent: 'flex-start',
                alignItems: 'center',
                paddingBottom: 6,
                marginBottom: 10,
                borderBottomWidth: 1,
                borderBottomStyle: 'dotted',
                borderBottomColor: theme?.colors.border,
            }}
        >
            <View
                style={{
                    flexGrow: 1,
                    flexDirection: 'row',
                    justifyContent: 'flex-start',
                    alignItems: 'center',
                    gap: 5,
                }}
            >
                <View
                    style={{ flexGrow: 0 }}
                >
                    <ThemedText
                        bold
                        size={18}
                    >
                        {author.username}
                    </ThemedText>
                </View>

                {isOnline && (
                    <View
                        style={{ flexGrow: 0 }}
                    >
                        <Icon
                            name='flash'
                            size={16}
                            color={theme?.colors.textDefault}
                        />
                    </View>
                )}

            </View>

            {(owner && onDelete) && (
                <View style={{ flexGrow: 0 }}>

                    <Pressable
                        onPress={() => onDelete(item._id)}
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

        </View>
    )

    return (
        <View
            style={{
                paddingBottom: 5,
            }}
            {...props}
        >
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

            <View
                style={{
                    flexBasis: 'auto',
                    flexGrow: 1,
                }}
            >
                {renderHeader()}
                
                <ThemedText
                    style={{
                        flex: 1,
                        paddingBottom: 10,
                    }}
                >
                    {text}
                </ThemedText>

            </View>

        </View>
    )
}