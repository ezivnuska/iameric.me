import React, { useEffect, useMemo, useState } from 'react'
import { View } from 'react-native'
import { ThemedText } from '@components'
import {
    FeedHeader,
    FeedList,
    FeedModal,
} from './components'
import { useFeed } from '.'
import { useSocket } from '@socket'
import { deletePostWithId } from './utils'

export default () => {

    const {
        modal,
        closeModal,
        setModal,
        addPost,
        posts,
        deletePost,
        setFeedLoading,
    } = useFeed()
    // const { closeModal } = useModal()
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

    useEffect(() => {
        if (posts) {
            console.log('posts changed', posts)
            // const threads = getSortedThreads()
            // setSortedThreads(threads)
        }
    }, [posts])

    const removePost = async id => {
        setFeedLoading(true)
        await deletePostWithId(id)
        setFeedLoading(false)
        socket.emit('post_deleted', id)
        deletePost(id)
        closeModal()
    }

    const renderThread = (items, index) => (
        <View
            key={`thread-${index}`}
            style={{
                borderWidth: 1,
                borderColor: '#ccc',
                borderRadius: 12,
            }}
        >
            <FeedList
                posts={items}
                onDelete={removePost}
            />
        </View>
    )

    const renderThreads = threads => {
        return (
            <View style={{ gap: 7 }}>
                {threads.map((thread, index) => renderThread(thread, index))}
            </View>)
    }
    
    return (
        <View style={{ flex: 1 }}>

            <FeedHeader
                setModal={setModal}
            />

            {sortedThreads.length
                ? renderThreads(sortedThreads)
                : <ThemedText>No posts yet.</ThemedText>
            }

            <FeedModal
                modal={modal}
                closeModal={closeModal}
                />
                
        </View>
    )
}