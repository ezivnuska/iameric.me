import React, { useEffect, useState } from 'react'
import { Pressable, View } from 'react-native'
import { ActivityIndicator, IconButton, ProfileImage, TextCopy, Time } from '@components'
import { useFeed, useUser } from '@context'
import { navigate } from '@utils/navigation'
import { loadPost, loadThread } from '@utils/feed'

const FeedListItem = ({ index, item, onDelete = null, ...props }) => {
    
    const { findPostById, updatePost } = useFeed()
    const { user } = useUser()

    const [disabled, setDisabled] = useState(false)
    const [loading, setLoading] = useState(false)
    const [post, setPost] = useState(null)

    useEffect(() => {
        if (item) initPost(item._id)
    }, [])

    useEffect(() => {
        if (post) updatePost(post)
    }, [post])
        
    const initPost = async id => {
        
        setLoading(true)

        let result = findPostById(id)
        
        if (!result) result = await loadPost(id)
        
        if (result) setPost(result)
        else console.log('could not find or load post data.')

        setLoading(false)
        
    }

    // const fetchMeta = async () => {
    //     // try {
    //         // const response = await fetch('https://www.npmjs.com/package/url-metadata')
    //         const url = 'https://www.npmjs.com/package/url-metadata'
    //         // console.log('res', response)
    //         const metadata = await parser(url)
    //         // const metadata = await urlMetadata(url)
    //         console.log('meta', metadata)
    //         return metadata
    //     // } catch (error) {
    //     //     console.error('error', error)
    //     // }
    // }
    // useEffect(() => {
    //     fetchMeta()
    // }, [])

    useEffect(() => {
        if (!loading && disabled) setDisabled(false)
    }, [loading])

    const handleDelete = id => {
        setDisabled(true)
        onDelete(id)
    }
    
    return post ? (
        <View
            {...props}
            style={{
                marginBottom: 20,
                gap: 10,
            }}
        >

            <View
                style={{
                    flexDirection: 'row',
                    alignItems: 'flex-start',
                    gap: 8,
                }}
            >
                <View
                    style={{
                        flexDirection: 'row',
                        alignItems: 'flex-start',
                        flexGrow: 1,
                        flexShrink: 1,
                        gap: 7,
                        flexWrap: 'wrap',
                    }}
                >
                    <Pressable
                        onPress={() => navigate('User', { screen: 'Profile', params: { username: post.author?.username } })}
                        style={{
                            flexDirection: 'row',
                            alignItems: 'flex-start',
                            flexGrow: 1,
                            flexShrink: 0,
                            gap: 10,
                        }}
                    >
                        <ProfileImage
                            userId={post.author._id}
                            user={post.author}
                            size={50}
                        />

                        <View
                            style={{
                                flexDirection: 'row',
                                alignItems: 'flex-end',
                                flexGrow: 1,
                                gap: 10,
                            }}
                        >
                            <View style={{ flex: 1, flexGrow: 1 }}>

                                {post.author?.username && (
                                    <TextCopy
                                        size={20}
                                        bold
                                        style={{ lineHeight: 25 }}
                                    >
                                        {post.author.username}
                                    </TextCopy>
                                )}

                                <Time
                                    time={post.createdAt}
                                    size={20}
                                    style={{ lineHeight: 25 }}
                                />

                            </View>

                            {(user._id === post.author?._id || user.role === 'admin') && (
                                <IconButton
                                    name='trash-outline'
                                    disabled={disabled}
                                    onPress={() => handleDelete(post._id)}
                                    color={user.role === 'admin' ? 'purple' : '#000'}
                                    size={26}
                                />
                            )}

                        </View>

                    </Pressable>

                </View>

            </View>

            <TextCopy
                size={24}
                style={{ lineHeight: 30 }}
            >
                {post.text}
            </TextCopy>
            
        </View>
    ) : <ActivityIndicator size='small' />
}

export default FeedListItem