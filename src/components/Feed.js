import React, { useEffect, useMemo, useState } from 'react'
import { FlatList, View } from 'react-native'
import { Divider, IconButton, Text } from 'react-native-paper'
import { AddImageButton, ImageLoader, NavBar, SmartAvatar } from '@components'
import { useFeed, useModal, useTheme, useUser } from '@context'
import { addPostImage, removePostImage } from '@utils/feed'
import { getTime } from '@utils/time'

const FeedItem = ({ post, onDelete, navigation, item, ...props }) => {
   
    const { getPost, updatePost } = useFeed()
    const { addModal } = useModal()
    const { landscape } = useTheme()
    const { user } = useUser()

    const owned = useMemo(() => post?.author && user._id === post.author._id, [post])
    const authorized = useMemo(() => (owned || user.role === 'admin'), [post])
    const currentPost = useMemo(() => post && getPost(post._id), [post])

    const isPortrait = useMemo(() => post?.image && post.image.height >= post.image.width, [post])
    const { width, height } = useMemo(() => {
        if (landscape && isPortrait) return { width: '40%', height: 240 }
        if (landscape && !isPortrait) return { width: '40%', height: 200 }
        if (!landscape && isPortrait) return { width: '100%', height: 280 }
        if (!landscape && !isPortrait) return { width: '100%', height: 180 }
    },[landscape])
    
    const onUploaded = async image => {
        const postWithImage = await addPostImage(currentPost._id, image._id)
        updatePost(postWithImage)
    }

    const onDeleteImage = async () => {
        const removedPost = await removePostImage(currentPost._id)
        if (removedPost) updatePost(removedPost)
    }

    return post && (
        <View
            {...props}
            style={{ flex: 1 }}
        >
            <View
                style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    gap: 15,
                    paddingLeft: 15,
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
                        onPress={() => onDelete(post._id)}
                        size={25}
                    />
                )}
    
            </View>

            <View
                style={{
                    // flex: 1,
                    flexDirection: (memory?.image && landscape) ? 'row' : 'column',
                    // justifyContent: (landscape && 'space-between'),
                    // gap: landscape ? 15 : 10,
                }}
            >
                {post.image && (
                    <View
                        style={{
                            height,
                            width,
                            marginBottom: 10,
                        }}
                    >
                        <ImageLoader
                            image={post.image}
                            user={post.author}
                        />
                    </View>
                )}
                    
                <View
                    style={{
                        flex: 1,
                        flexDirection: 'row',
                    }}
                >
                    <View
                        style={{
                            flex: 1,
                            gap: 10,
                            paddingLeft: 15,
                            paddingBottom: 20,
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
                        
                    </View>

                    {owned && (
                        <View>
                            <IconButton
                                icon='comment-edit-outline'
                                onPress={() => addModal('FEEDBACK', post)}
                            />

                            {post?.image ? (
                                <IconButton
                                    icon='file-image-minus'
                                    onPress={onDeleteImage}
                                />
                            ) : (
                                <AddImageButton
                                    onSelection={({ uri, height, width }) => updatePost({
                                        ...post,
                                        image: { uri, height, width },
                                    })}
                                    onUploaded={onUploaded}
                                />
                            )}
                        </View>
                    )}
                </View>

            </View>
        </View>
    )
}

const Feed = ({ posts, onDelete, ...props }) => {
    useEffect(() => {
        console.log('posts', posts)
    }, [posts])
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
                            onDelete={() => onDelete(item._id)}
                        />
                    )}
                    ItemSeparatorComponent={({ highlighted }) => <Divider style={{ marginBottom: 5 }} />}
                />
            )}

        </View>
    )
}

export default Feed