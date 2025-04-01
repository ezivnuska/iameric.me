import React, { useEffect } from 'react'
import { Screen } from './components'
import { Feed } from '@components'
import { useFeed, useSocket } from '@context'
import { deletePostWithId, loadPosts } from '@utils/feed'
    
const FeedScreen = props => {

    const {
        posts,
        deletePost,
        setFeedLoading,
        setPosts,
        updatePost,
    } = useFeed()
    const { socket } = useSocket()

    useEffect(() => {

        socket.on('new_post', updatePost)
        socket.on('deleted_post', deletePost)

        initFeed()
    }, [])

    const initFeed = async () => {

        setFeedLoading(true)
        const loadedPosts = await loadPosts()
        setFeedLoading(false)
        
        if (loadedPosts) setPosts(loadedPosts)
        else console.log('could not load posts')
    }

    const onDelete = async post => {
        
        await deletePostWithId(post._id)
        
        socket.emit('post_deleted', post._id)

        deletePost(post)
    }

    return (
        <Screen {...props} secure full>

            {posts && (
                <Feed
                    {...props}
                    posts={posts}
                    onDelete={onDelete}
                />
            )}
            
        </Screen>
    )
}

export default FeedScreen