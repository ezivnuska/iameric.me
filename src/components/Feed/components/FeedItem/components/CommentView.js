import React, { useEffect, useMemo } from 'react'
import { FlatList, View } from 'react-native'
import { IconButton, Text } from 'react-native-paper'
import { ImageLoader, SmartAvatar } from '@components'
import { useFeed, useModal, useTheme, useUser } from '@context'
import { loadThread } from '@utils/feed'
import { getTime } from '@utils/time'

const CommentView = ({ post, onDelete, ...props }) => {
   
    const { updatePost } = useFeed()
    const { addModal } = useModal()
    const { landscape } = useTheme()
    const { user } = useUser()

    const owned = useMemo(() => post?.author && user._id === post.author._id, [post])
    const authorized = useMemo(() => (owned || user.role === 'admin'), [post])

    const isPortrait = useMemo(() => post?.image && post.image.height >= post.image.width, [post])

    const { width, height } = useMemo(() => {
        if (landscape && isPortrait) return { width: '40%', height: 240 }
        if (landscape && !isPortrait) return { width: '40%', height: 200 }
        if (!landscape && isPortrait) return { width: '100%', height: 280 }
        if (!landscape && !isPortrait) return { width: '100%', height: 180 }
    },[landscape])

    useEffect(() => {
        fetchThread()
    }, [])

    const fetchThread = async () => {
        const comments = await loadThread(post._id)
        if (comments) updatePost({ ...post, comments })
    }

    return post && (
        <View {...props}>
            <View
                style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    gap: 15,
                    paddingLeft: 15,
                    paddingRight: 5,
                    paddingTop: 7,
                    paddingBottom: 5,
                }}
            >
                <SmartAvatar
                    user={post.author}
                    size={landscape ? 30 : 40}
                />
    
                <View
                    style={{
                        flex: 1,
                        flexDirection: landscape && 'row',
                        alignItems: landscape && 'center',
                        gap: (landscape && 15),
                    }}
                >
                    
                    <Text variant='titleMedium'>
                        {post.author.username}
                    </Text>
    
                    <Text
                        variant='titleMedium'
                        style={{ color: '#aaa' }}
                    >
                        {getTime(post.createdAt, 'relative')}
                    </Text>
    
                </View>
    
                {authorized && (
                    <IconButton
                        icon='delete-forever'
                        onPress={() => onDelete(post)}
                        size={25}
                        style={{ margin: 0 }}
                    />
                )}
    
            </View>

            <View
                style={{
                    flexDirection: (post?.image && landscape) ? 'row' : 'column',
                    gap: 15,
                    marginVertical: 5,
                    paddingLeft: (landscape && 15),
                }}
            >
                {post.image && (
                    <ImageLoader
                        image={post.image}
                        user={post.author}
                        maxDims={{ width, height }}
                    />
                )}
                
                <View
                    style={{
                        flex: 1,
                        // flexDirection: 'row',
                    }}
                >
                    <View
                        style={{
                            flex: 1,
                            flexDirection: 'row',
                            gap: 10,
                            paddingLeft: (!landscape && 15),
                            paddingRight: 5,
                            paddingVertical: 6,
                        }}
                    >

                        <Text
                            variant='bodyLarge'
                            style={{
                                flex: 1,
                                paddingRight: 15,
                            }}
                            >
                            {post.text}
                        </Text>
                        
                        {owned && (
                            <View>
                                <IconButton
                                    icon='comment-edit-outline'
                                    onPress={() => addModal('FEEDBACK', post)}
                                    style={{ margin: 0 }}
                                />
                            </View>
                        )}


                    </View>

                    {/* {(post.comments?.length > 0) && (
                        <View style={{ paddingLeft: 15 }}>
                            <FlatList
                                data={post.comments}
                                extraData={post.comments}
                                keyExtractor={(item, index) => `comment-${item._id}-${index}`}
                                renderItem={({ item }) => (
                                    <FeedItem
                                        post={item}
                                        onDelete={() => onDelete(item)}
                                    />
                                )}
                            />
                        </View>
                    )} */}

                </View>

            </View>

        </View>
    )
}

export default CommentView