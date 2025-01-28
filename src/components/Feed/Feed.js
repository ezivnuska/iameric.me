import React, { useEffect, useRef, useState } from 'react'
import { FlatList, View } from 'react-native'
import { FeedItem, FeedModal } from './components'
import { useFeed, useSocket, useUser } from '@context'
import { deletePostWithId } from '@utils/feed'
import { Divider } from 'react-native-paper'

const Feed = () => {

    const {
        feedModal,
        posts,
        updatePost,
        closeFeedModal,
        deletePost,
    } = useFeed()
    const { socket } = useSocket()

    const [loading, setLoading] = useState(false)

    const listRef = useRef()

    useEffect(() => {
        socket.on('new_post', updatePost)
        socket.on('deleted_post', deletePost)
    }, [])

    const removePost = async id => {

        setLoading(true)

        await deletePostWithId(id)
        
        setLoading(false)

        socket.emit('post_deleted', id)

        deletePost(id)

        closeFeedModal()
        
    }
    
    return (
        <View style={{ flex: 1 }}>

            {posts && (
                <FlatList
                    ref={listRef}
                    data={posts}
                    extraData={posts}
                    keyExtractor={item => `post-${item._id}`}
                    renderItem={({ item }) => (
                        <FeedItem
                            item={item}
                            onDelete={removePost}
                            disabled={loading}
                        />
                    )}
                    ItemSeparatorComponent={({ highlighted }) => <Divider style={{ marginBottom: 5 }} />}
                />
            )}

            <FeedModal
                modal={feedModal}
                onClose={closeFeedModal}
            />

        </View>
    )
}

export default Feed