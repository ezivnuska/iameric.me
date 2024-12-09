import React, { useEffect, useMemo } from 'react'
import { View } from 'react-native'
import { FeedList, FeedNavBar } from './components'
import { useFeed, useModal, useSocket } from '@context'
import { DefaultText } from '@components'
import { createPost, deletePostWithId } from './utils'

const FeedContainer = props => {

    const {
        addPost,
        posts,
        deletePost,
        setFeedLoading,
    } = useFeed()

    const { closeModal } = useModal()
    
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
        closeModal()
    }

    const handleSubmit = async data => {
        const post = await createPost(data)
        if (post) {
            addPost(post)
            socket.emit('new_post', post)
        }
        closeModal()
        return post
    }

    const renderThreads = threads => (
        <View
            style={{
                gap: 10,
            }}
        >
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
        <View
            style={{
                flex: 1,
                paddingHorizontal: 10,
                gap: 10,
            }}
        >

            <FeedNavBar {...props} />

            <View
                style={{
                    flexGrow: 1,
                }}
            >
                {sortedThreads.length
                    ? renderThreads(sortedThreads)
                    : (
                        <DefaultText
                            size={24}
                            style={{ lineHeight: 30 }}
                        >
                            No posts yet.
                        </DefaultText>
                    )
                }
            </View>
                
        </View>
    )
}

export default FeedContainer