import React, { useEffect, useMemo, useRef, useState } from 'react'
import { FlatList, View } from 'react-native'
import { FeedListItem } from './components'
import { useFeed, useModal, useSocket } from '@context'
import { TextCopy } from '@components'
import { deletePostWithId, loadPosts } from '@utils/feed'
import { ActivityIndicator } from '@common'

const FeedContainer = props => {

    const {
        feedLoading,
        posts,
        addPost,
        deletePost,
        setFeedLoading,
    } = useFeed()
    const { closeModal } = useModal()
    const { socket } = useSocket()

    const [postIds, setPostIds] = useState(null)

    const listRef = useRef()

    // const getThreadIds = () => {
    //     let ids = []
    //     posts.map(post => {
    //         if (ids.indexOf(post._id) < 0) {
    //             ids.push(post._id)
    //         }
    //     })
    //     return ids
    // }

    // const getSortedThreads = () => {

    //     const threadIds = getThreadIds()
    //     const threads = []
        
    //     threadIds.map(threadId => {

    //         const thread = posts.filter(post => (post.threadId && post.threadId === threadId) || (!post.threadId && post._id === threadId))
            
    //         if (thread.length) {
    //             threads.push(thread.reverse())
    //         }
    //     })

    //     return threads
    // }

    // const sortedThreads = useMemo(() => getSortedThreads(), [posts])

    useEffect(() => {
        socket.on('new_post', addPost)
        socket.on('deleted_post', deletePost)
        loadPostIds()
    }, [])

    const loadPostIds = async () => {
        if (!feedLoading) setFeedLoading(true)
        const ids = await loadPosts()
        setFeedLoading(false)
        
        if (ids) {
            setPostIds(ids)
        } else {
            console.log('could not load feed ids.')
        }
    }

    const removePost = async id => {

        setFeedLoading(true)
        await deletePostWithId(id)
        setFeedLoading(false)
        
        socket.emit('post_deleted', id)

        deletePost(id)
        closeModal()
    }
    
    return (
        <View style={{ flex: 1 }}>

            {feedLoading
                ? <ActivityIndicator />
                : postIds
                    // ? postIds.map((items, index) => (
                    ? (
                        <FlatList
                            ref={listRef}
                            data={postIds}
                            keyExtractor={(item, index) => `post-${index}`}
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
                            renderItem={({ item, index }) => (
                                <FeedListItem
                                    key={`thread-${index}`}
                                    index={index}
                                    item={item}
                                    onDelete={removePost}
                                />
                            )}
                        />
                    )
                    : <TextCopy> No posts yet.</TextCopy>
            }

        </View>
    )
}

export default FeedContainer