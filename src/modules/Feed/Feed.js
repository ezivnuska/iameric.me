import React, { useEffect, useMemo } from 'react'
import { View } from 'react-native'
import { ThemedText } from '@components'
import {
    FeedHeader,
    FeedList,
    FeedModal,
    useFeed,
} from '.'
import { useSocket } from '@socket'
import { deletePostWithId } from './utils'

export default () => {

    const {
        feedModal,
        closeFeedModal,
        setFeedModal,
        addPost,
        posts,
        deletePost,
        setFeedLoading,
    } = useFeed()
    
    const { socket } = useSocket()

    const getThreadIds = () => {
        let ids = []
        posts.map(post => {
            if (ids.indexOf(post._id) < 0) {
                ids.push(post._id)
            }
        })
        return ids
    }

    const getSortedThreads = () => {
        const threadIds = getThreadIds()
        const threads = []
        threadIds.map(threadId => {

            const thread = posts.filter(post => (post.threadId && post.threadId === threadId) || (!post.threadId && post._id === threadId))
            
            if (thread.length) {
                threads.push(thread.reverse())
            }
        })
        return threads
    }

    const sortedThreads = useMemo(() => getSortedThreads(), [posts])

    useEffect(() => {
        socket.on('new_post', addPost)
        socket.on('deleted_post', deletePost)
    }, [])

    const removePost = async id => {
        setFeedLoading(true)
        await deletePostWithId(id)
        setFeedLoading(false)
        socket.emit('post_deleted', id)
        deletePost(id)
        closeFeedModal()
    }

    const handleSubmit = data => {
        addPost(data)
        closeFeedModal()
    }

    const renderThreads = threads => (
        <View style={{ gap: 7 }}>
            {threads.map((items, index) => (
                <FeedList
                    key={`thread-${index}`}  
                    posts={items}
                    onDelete={removePost}
                />
            ))}
        </View>
    )
    
    return (
        <View style={{ flex: 1 }}>

            <FeedHeader setModal={setFeedModal} />

            {sortedThreads.length
                ? renderThreads(sortedThreads)
                : <ThemedText>No posts yet.</ThemedText>
            }

            <FeedModal
                modal={feedModal}
                onCancel={closeFeedModal}
                onSubmit={handleSubmit}
            />
                
        </View>
    )
}