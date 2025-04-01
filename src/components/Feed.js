import React, { useEffect, useMemo, useState } from 'react'
import { FlatList, View } from 'react-native'
import { Divider, IconButton, Text } from 'react-native-paper'
import { AddImageButton, ImageLoader, NavBar, SmartAvatar } from '@components'
import { useFeed, useModal, useTheme, useUser } from '@context'
import { addPostImage, loadThread, removePostImage } from '@utils/feed'
import { getTime } from '@utils/time'

const FeedItem = ({ post, onDelete, ...props }) => {
   
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

    // const [comments, setComments] = useState(null)

    useEffect(() => {
        fetchThread()
    }, [])

    const fetchThread = async () => {
        const comments = await loadThread(post._id)
        if (comments) {
            // setComments(thread)
            updatePost({
                ...post,
                comments,
            })
        }
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

                    {(post.comments?.length > 0) && (
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
                    )}

                </View>

            </View>

        </View>
    )
}

const Feed = ({ posts, onDelete, ...props }) => {

    const { addModal } = useModal()
    const { updatePost } = useFeed()
    const { user } = useUser()

    const onUploaded = async (image, post) => {
        const postWithImage = await addPostImage(post._id, image._id)
        updatePost(postWithImage)
    }

    const onDeleteImage = async post => {
        const removedPost = await removePostImage(post._id)
        if (removedPost) updatePost(removedPost)
    }

    return (
        <View style={{ flex: 1 }}>

            <NavBar {...props} />
                
            {posts && (
                <FlatList
                    data={posts}
                    extraData={posts}
                    keyExtractor={(item, index) => `post-${item._id}-${index}`}
                    renderItem={({ item }) => (
                        <FeedItem
                            post={item}
                            onDelete={onDelete}
                        />
                    )}
                    ItemSeparatorComponent={({ highlighted, leadingItem }) => (
                        <View
                            style={{
                                flexDirection: 'row',
                                justifyContent: 'space-between',
                                marginBottom: 5,
                                borderBottomWidth: 1,
                                borderBottomColor: '#ccc',
                                paddingLeft: 5,
                                paddingRight: 5,
                            }}
                        >

                            <View>
                                <IconButton
                                    icon='comment-plus'
                                    onPress={() => addModal('COMMENT', { author: user._id, threadId: leadingItem._id })}
                                    style={{ margin: 0 }}
                                />
                            </View>

                            {user._id === leadingItem.author._id && (
                                <View style={{ flexDirection: 'row' }}>

                                    {leadingItem?.image ? (
                                        <IconButton
                                            icon='file-image-minus'
                                            onPress={() => onDeleteImage(leadingItem)}
                                            style={{ margin: 0 }}
                                        />
                                    ) : (
                                        <AddImageButton
                                            onSelection={({ uri, height, width }) => updatePost({
                                                ...leadingItem,
                                                image: { uri, height, width },
                                            })}
                                            onUploaded={image => onUploaded(image, leadingItem)}
                                        />
                                    )}
                                </View>
                            )}
                        </View>
                    )}
                />
            )}

        </View>
    )
}

export default Feed