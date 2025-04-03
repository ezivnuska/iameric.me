import React, { useEffect, useMemo } from 'react'
import { View } from 'react-native'
import { IconButton, Text } from 'react-native-paper'
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
                padding={[Size.None, Size.XS, Size.None, Size.S]}
                align='center'
                style={{ marginBottom: (post.image && Size.S) }}
            >

                <SmartAvatar
                    user={post.author}
                    size={landscape ? 30 : 40}
                />
    
                <Stack flex={1}>
                    
                    <Text variant='titleMedium'>{post.author.username}</Text>
    
                    <Text variant='titleMedium' style={{ color: '#aaa' }}>
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

            <Stack
                direction={(post?.image && landscape && 'row')}
                padding={[Size.None, Size.S, Size.None, Size.S]}
                spacing={Size.S}
            >
                {/* <Row
                    // flex={1}
                    padding={[Size.None, Size.S, Size.None, Size.S]}
                > */}
                    {post.image && (
                        <ImageLoader
                            image={post.image}
                            user={post.author}
                            maxDims={{ width, height }}
                        />
                    )}
                {/* </Row> */}
                
                <Row
                    flex={1}
                    spacing={Size.S}
                    padding={[Size.None, Size.None, Size.None, Size.XS]}
                    align='flex-start'
                >
                    <View style={{ flex: 1 }}>
                        <Text
                            variant='bodyLarge'
                            style={{ flex: 1, paddingVertical: 7 }}
                        >
                            {post.text}
                        </Text>
                    </View>
                    
                    {owned && (
                        <IconButton
                            icon='comment-edit-outline'
                            onPress={() => addModal('FEEDBACK', post)}
                            style={{ margin: 0 }}
                        />
                    )}

                </Row>

            </Stack>

        </Stack>
    )
}

export default FeedItem