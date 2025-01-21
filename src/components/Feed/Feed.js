import React, { useEffect, useRef, useState } from 'react'
import { FlatList, View } from 'react-native'
import { FeedListItem, FeedModal } from './components'
import { useFeed, useSocket } from '@context'
import { deletePostWithId } from '@utils/feed'

const Feed = props => {

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
                        <FeedListItem item={item} onDelete={removePost} />
                    )}
                    // getItemLayout={(data, index) => (
                    //     {
                    //         length: ITEM_HEIGHT,
                    //         offset: ITEM_HEIGHT * index, index
                    //     }
                    // )}
                    // horizontal={landscape}
                    // numColumns={landscape ? 2 : 1}
                    // onRefresh={onRefresh}
                    // refreshing={refreshing}
                    // initialNumToRender={6}
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