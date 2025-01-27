import React from 'react'
import { Pressable, View } from 'react-native'
import { Time, UserAvatar } from '@components'
import { IconButton, Text } from 'react-native-paper'
import { useUser } from '@context'
import { navigate } from '@utils/navigation'

const BugListItem = ({ item, loading, onDelete = null }) => {

    const { user } = useUser()

    return (
        <View
            key={`bug-${item._id}`}
            style={{
                flexGrow: 0,
                marginBottom: 20,
                gap: 5,
            }}
        >

            <View
                style={{
                    flexDirection: 'row',
                    alignItems: 'flex-start',
                }}
            >
                <View
                    style={{
                        flexDirection: 'row',
                        alignItems: 'flex-start',
                        flexGrow: 1,
                        flexShrink: 1,
                        gap: 7,
                        flexWrap: 'wrap',
                    }}
                >
                    <Pressable
                        onPress={() => navigate('User', { screen: 'Profile', params: { username: item.author.username } })}
                        style={{
                            flexDirection: 'row',
                            alignItems: 'flex-start',
                            flexGrow: 1,
                            flexShrink: 0,
                            gap: 10,
                        }}
                    >
                        <UserAvatar
                            user={item.author}
                            size={50}
                        />

                        <View
                            style={{
                                flexDirection: 'row',
                                alignItems: 'flex-end',
                                flexGrow: 1,
                                gap: 10,
                            }}
                        >
                            <View
                                style={{
                                    flex: 1,
                                    flexGrow: 1,
                                }}
                            >
                                <Text variant='titleMedium'>
                                    {item.author.username}
                                </Text>

                                <Time
                                    time={item.createdAt}
                                    size={18}
                                    color='#777'
                                    style={{ lineHeight: 25 }}
                                />

                            </View>

                            {(user._id === item.author._id || user.role === 'admin') && (
                                <IconButton
                                    icon='delete-forever'
                                    onPress={() => onDelete(item._id)}
                                    disabled={loading}
                                />
                            )}

                        </View>

                    </Pressable>

                </View>

            </View>

            <Text variant='bodyLarge'>
                {item.text}
            </Text>

        </View>
    )
}

export default BugListItem