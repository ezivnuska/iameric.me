import React, { useEffect, useRef, useState } from 'react'
import { FlatList, Image, View } from 'react-native'
import {
    // ActivityIndicator, Button,
    Card, Divider, IconButton, Text,
} from 'react-native-paper'
import { Time, UserAvatar } from '@components'
import { useFeed, useModal, useSocket, useUser } from '@context'
import { deletePostWithId } from '@utils/feed'
import { loadPost } from '@utils/feed'

const IMAGE_PATH = __DEV__ ? 'https://iameric.me/assets' : '/assets'

const FeedItem = ({ onDelete, navigation, item, authorized = false }) => {
   
    const { updatePost } = useFeed()

    const [loading, setLoading] = useState(false)
    const [post, setPost] = useState(null)

    useEffect(() => {
        if (item) initPost(item._id)
    }, [])
        
    const initPost = async id => {
        
        setLoading(true)
        
        let result = await loadPost(id)
        
        if (result) {
            setPost(result)
            updatePost(result)
        }
        else console.log('could not find or load post data.')

        setLoading(false)
        
    }

    return post && (
        <View>

            <Card.Title
                title={post.author.username}
                titleVariant='titleMedium'
                subtitle={<Time time={post.createdAt} />}
                style={{ gap: 10 }}
                left={() => (
                    <UserAvatar
                        user={post.author}
                        onPress={() => navigation.navigate('User', { screen: 'Profile', params: { username: post.author?.username } })}
                    />
                )}
                right={() => authorized && (
                    <IconButton
                        icon='delete-forever'
                        onPress={() => onDelete(post._id)}
                        disabled={loading}
                    />
                )}
            />

            <Card.Content
                style={{ paddingBottom: 20, gap: 15 }}
            >
                {post.image && (
                    <Image
                        source={`${IMAGE_PATH}/${post.author.username}/${post.image.filename}`}
                        resizeMode='contain'
                        style={{
                            width: post.image.width,
                            height: post.image.height,
                        }}
                    />
                )}
                <Text variant='bodyLarge'>{post.text}</Text>
            </Card.Content>
        </View>
    )
}

const Feed = props => {

    const {
        posts,
        updatePost,
        deletePost,
    } = useFeed()

    const { closeModal, setModal } = useModal()
    const { socket } = useSocket()
    const { user } = useUser()

    const [items, setItems] = useState(posts)
    const [loading, setLoading] = useState(false)

    const listRef = useRef()

    useEffect(() => {
        socket.on('new_post', updatePost)
        socket.on('deleted_post', deletePost)
    }, [])

    useEffect(() => {
        setItems(posts)
    }, [posts])

    const removePost = async id => {

        setLoading(true)

        await deletePostWithId(id)
        
        setLoading(false)

        socket.emit('post_deleted', id)

        deletePost(id)

        closeModal()
        
    }
    
    return (
        <Card
            elevation={0}
            style={{ flex: 1 }}
        >

            <Card.Title
                title='Feed'
                titleVariant='titleLarge'
                // left={() => <IconButton icon='home' onPress={() => props.navigation.navigate('Feed')} />}
                right={() => <IconButton icon='plus-thick' onPress={() => setModal('FEEDBACK')} size={30} />}
                style={{ padding: 0, marginLeft: 15 }}
            />

            <Card.Content style={{ padding: 0 }}>
                
                {items && (
                    <FlatList
                        ref={listRef}
                        data={items}
                        extraData={items}
                        keyExtractor={item => `post-${item._id}`}
                        renderItem={({ item }) => {
                            const authorized = user && (user._id === item.author?._id || user.role === 'admin')
                            return (
                                <FeedItem
                                    item={item}
                                    navigation={props.navigation}
                                    onDelete={removePost}
                                    disabled={loading}
                                    authorized={authorized}
                                />
                            )
                        }}
                        ItemSeparatorComponent={({ highlighted }) => <Divider style={{ marginBottom: 5 }} />}
                    />
                )}

            </Card.Content>

            {/* <FeedModal
                modal={feedModal}
                onClose={closeFeedModal}
            /> */}

        </Card>
    )
}

export default Feed