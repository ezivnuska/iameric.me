import React, { useEffect, useMemo } from 'react'
import { FlatList, View } from 'react-native'
import { IconButton, Text } from 'react-native-paper'
import { CommentView } from './components'
import { ImageLoader, Row, SmartAvatar, Stack } from '@components'
import { useFeed, useModal, useTheme, useUser } from '@context'
import { loadThread } from '@utils/feed'
import { getTime } from '@utils/time'
import { Size } from '@utils/stack'

const FeedItem = ({ post, onDelete }) => {
   
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
        <Stack>

            <Row
                flex={1}
                spacing={Size.M}
                padding={[Size.XS, Size.XS, Size.XS, Size.M]}
                align='center'
            >

                <SmartAvatar
                    user={post.author}
                    size={landscape ? 30 : 40}
                />
    
                <Stack flex={1}>
                    
                    <Text variant='titleMedium'>
                        {post.author.username}
                    </Text>
    
                    <Text
                        variant='titleMedium'
                        style={{ color: '#aaa' }}
                    >
                        {getTime(post.createdAt, 'relative')}
                    </Text>
    
                </Stack>
    
                {authorized && (
                    <IconButton
                        icon='delete-forever'
                        onPress={() => onDelete(post)}
                        size={25}
                        style={{ margin: 0 }}
                    />
                )}
    
            </Row>

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
                
                <Stack>

                    <Row
                        spacing={Size.S}
                        padding={[Size.XS, Size.XS, Size.XS, Size.M]}
                        align='flex-start'
                    >

                        <Text
                            variant='bodyLarge'
                            style={{ flex: 1, paddingVertical: 7 }}
                        >
                            {post.text}
                        </Text>
                        
                        {owned && (
                            <IconButton
                                icon='comment-edit-outline'
                                onPress={() => addModal('FEEDBACK', post)}
                                style={{ margin: 0 }}
                            />
                        )}

                    </Row>

                    {(post.comments?.length > 0) && (
                        <FlatList
                            data={post.comments}
                            extraData={post.comments}
                            style={{ marginLeft: 20 }}
                            keyExtractor={(item, index) => `comment-${item._id}-${index}`}
                            renderItem={({ item }) => (
                                <CommentView
                                    post={item}
                                    onDelete={() => onDelete(item)}
                                />
                            )}
                        />
                    )}

                </Stack>

            </View>

        </Stack>
    )
}

export default FeedItem