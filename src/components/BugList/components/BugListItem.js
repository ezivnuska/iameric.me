import React from 'react'
import { Pressable, View } from 'react-native'
import { IconButton, TextCopy, Time, UserAvatar } from '@components'
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
                                <TextCopy
                                    size={20}
                                    bold
                                    style={{ lineHeight: 25 }}
                                >
                                    {item.author.username}
                                </TextCopy>

                                <Time
                                    time={item.createdAt}
                                    size={18}
                                    color='#777'
                                    style={{ lineHeight: 25 }}
                                />

                            </View>

                            {(user._id === item.author._id || user.role === 'admin') && (
                                <IconButton
                                    name='trash-outline'
                                    disabled={loading}
                                    onPress={() => onDelete(item._id)}
                                    color={user.role === 'admin' ? 'purple' : '#000'}
                                    size={25}
                                />
                            )}

                        </View>

                    </Pressable>

                </View>

            </View>

            <TextCopy
                size={20}
                style={{ lineHeight: 30 }}
            >
                {item.text}
            </TextCopy>

        </View>
    )
}

export default BugListItem