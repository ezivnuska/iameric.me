import React, { useEffect, useMemo } from 'react'
import { View } from 'react-native'
import { FeedList } from './components'
import { useFeed, useModal, useSocket } from '@context'
import { TextCopy } from '@components'
import { deletePostWithId } from './utils'

const FeedContainer = props => {

    const {
        posts,
        addPost,
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
    
    return (
        <View style={{ flex: 1 }}>

            {/* <FeedNavBar {...props} /> */}

            <View style={{ gap: 10, paddingHorizontal: 10 }}>
                
                {
                    sortedThreads.length
                        ? sortedThreads.map((items, index) => (
                            <FeedList
                                key={`thread-${index}`}  
                                posts={items}
                                onDelete={removePost}
                            />
                        ))
                        : <TextCopy> No posts yet.</TextCopy>
                }

            </View>
                
        </View>
    )
}

export default FeedContainer