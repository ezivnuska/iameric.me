import React, { useEffect, useState } from 'react'
import {
    Image,
    Pressable,
    View,
} from 'react-native'
import {
    IconButton,
    ThemedText,
} from '@components'
import { classes } from '@styles'
import {
    useApp,
} from '@context'

export default ({ item, imagePath, onPress, owner, onDelete = null, ...props }) => {
    
    const { theme } = useApp()
    
    const { author, text } = item

    const [online, setOnline] = useState(false)
    
    useEffect(() => {
        if (author && author.exp) {
            const newDate = new Date(author.exp) - Date.now()
            const expired = (newDate > 0)
            setOnline(!expired)
        }
    }, [item])

    return (
        <View
            style={{
                flexDirection: 'row',
                justifyContent: 'flex-start',
                alignItems: 'flex-start',
                gap: 15,
                paddingBottom: 5,
            }}
            {...props}
        >
            <View
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
            </View>

            <View
                style={{
                    flexBasis: 'auto',
                    flexGrow: 1,
                    flexShrink: 1,
                }}
            >
                <View
                    style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        paddingBottom: 6,
                        marginBottom: 10,
                        borderBottomWidth: 1,
                        borderBottomStyle: 'dotted',
                        borderBottomColor: theme?.colors.border,
                    }}
                >
                    <Pressable
                        style={{ flexBasis: 'auto', flexGrow: 1 }}
                        onPress={onPress}
                    >
                        <ThemedText
                            style={classes.userHeading}
                        >
                            {author.username}
                            {online && <ThunderboltOutlined style={{ marginLeft: 10, color: 'green' }} />}
                        </ThemedText>

                    </Pressable>

                    {(owner && onDelete) && (
                        <View
                            style={{
                                flexBasis: 'auto',
                                flexGrow: 0,
                                marginTop: -1,
                            }}
                        >
                            <IconButton
                                iconName='trash-outline'
                                onPress={() => onDelete(item._id)}
                                textStyles={{ fontSize: 15 }}
                                transparent
                            />
                        </View>
                    )}

                </View>
                
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