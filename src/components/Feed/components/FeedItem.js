import React, { useEffect, useMemo, useState } from 'react'
import { Pressable, StyleSheet, View } from 'react-native'
import { Time, UserAvatar } from '@components'
import { useFeed, useTheme, useUser } from '@context'
import { navigate } from '@utils/navigation'
import { loadPost } from '@utils/feed'
import { IconButton, Text } from 'react-native-paper'

const FeedItem = ({ item, disabled, onDelete = null }) => {
    
    const { theme } = useTheme()
    const { updatePost } = useFeed()
    const { user } = useUser()

    const [loading, setLoading] = useState(false)
    const [post, setPost] = useState(null)

    useEffect(() => {
        console.log('THMEE', theme)
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

    const navigateToAuthorProfile = () => {
        navigate('User', { screen: 'Profile', params: { username: post.author?.username } })
    }

    const authorized = useMemo(() => post && (user._id === post.author?._id || user.role === 'admin'), [post])

    return post && (
        <View style={styles.container}>

            <View style={styles.header}>

                <View style={styles.details}>

                    <Pressable
                        onPress={navigateToAuthorProfile}
                        style={styles.author}
                    >

                        <UserAvatar user={post.author} size={30} />

                        <Text
                            variant='bodyLarge'
                            style={{ fontWeight: 700 }}
                        >
                            {post.author.username}
                        </Text>

                    </Pressable>

                    <Time time={post.createdAt} size={18} />
                
                </View>

                {authorized && (
                    <IconButton
                        icon='delete-forever'
                        size={25}
                        onPress={() => onDelete(post._id)}
                        disabled={disabled || loading}
                    />
                )}

            </View>

            <Text variant='bodyLarge'>
                {post.text}
            </Text>

        </View>
    )
}

export default FeedItem

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingLeft: 10,
        // paddingHorizontal: 10,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        gap: 10,
    },
    details: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start',
        gap: 10,
    },
    author: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start',
        gap: 10,
    },
})