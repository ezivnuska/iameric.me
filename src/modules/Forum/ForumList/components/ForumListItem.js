import React from 'react'
import { Pressable, View } from 'react-native'
import {
    IconButton,
    ProfileImage,
    ThemedText,
    Time,
} from '@components'
import { useUser } from '@user'
import { useForum } from '@forum'
import { navigate } from '@utils/navigation'

const ForumListItem = ({ item, onDelete = null }) => {
    
    const { _id, author, createdAt, text } = item

    const {
        forumLoading,
        setForumModal,
    } = useForum()

    const { user } = useUser()

    return (
        <View
            key={`entry-${_id}`}
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
                        onPress={() => {
                            navigate('Contact', { screen: 'Details', params: { username: author.username } })
                        }}
                        style={{
                            flexDirection: 'row',
                            alignItems: 'flex-start',
                            flexGrow: 1,
                            flexShrink: 0,
                            gap: 10,
                        }}
                    >
                        <ProfileImage
                            user={author}
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
                                <ThemedText
                                    size={20}
                                    bold
                                    style={{ lineHeight: 25 }}
                                >
                                    {author.username}
                                </ThemedText>

                                <Time
                                    time={createdAt}
                                    size={20}
                                    style={{ lineHeight: 25 }}
                                />

                            </View>
                            
                            <View>
                                {/* <IconButton
                                    name='chatbox-ellipses-outline'
                                    size={25}
                                    onPress={() => setForumModal('FEEDBACK', item)}
                                /> */}

                                {(user._id === author._id || user.role === 'admin') && (
                                    <IconButton
                                        name='trash-outline'
                                        disabled={forumLoading}
                                        onPress={() => onDelete(_id)}
                                        color='#000'
                                        size={25}
                                    />
                                )}
                            </View>

                        </View>

                    </Pressable>

                </View>

            </View>

            <ThemedText
                size={24}
                style={{ lineHeight: 30 }}
            >
                {text}
            </ThemedText>

        </View>
    )
}

export default ForumListItem