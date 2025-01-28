import React, { useEffect, useMemo, useState } from 'react'
import { View } from 'react-native'
import { ActivityIndicator, Card, IconButton, Text } from 'react-native-paper'
import { Time, UserAvatar } from '@components'
import { useFeed, useUser } from '@context'
import { navigate } from '@utils/navigation'
import { loadPost } from '@utils/feed'

const FeedItem = ({ item, disabled, onDelete = null }) => {
    
    const { updatePost } = useFeed()
    const { user } = useUser()

    const [loading, setLoading] = useState(false)
    const [post, setPost] = useState(null)

    useEffect(() => {
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

    if (loading) return <ActivityIndicator />

    return post && (
        <View style={{ flex: 1 }}>

            <Card.Title
                title={post.author.username}
                titleVariant='titleMedium'
                // titleStyle={{ gap: 0, borderWidth: 1 }}
                subtitle={<Time time={post.createdAt} />}
                // subtitleStyle={{ gap: 0, borderWidth: 1 }}
                // subitleVariant='titleMedium'
                style={{ gap: 10 }}
                left={() => <UserAvatar user={post.author} onPress={navigateToAuthorProfile} />}
                right={() => authorized && (
                    <IconButton
                        icon='delete-forever'
                        onPress={() => onDelete(post._id)}
                        disabled={loading}
                        // iconColor={MD3Colors.error50}
                        // size={25}
                        // style={{ borderWidth: 1 }}
                    />
                )}
            />
            
            {/* <Image
                source={source}
                resizeMode='contain'
                style={{ flex: 1, flexGrow: 1 }}
            /> */}

            <Card.Content
                style={{ paddingBottom: 20 }}
            >
                <Text variant='bodyLarge'>{post.text}</Text>
            </Card.Content>
            
            {/* {(isOwner || hasAuthorization) && (
                <Card.Actions>
                    {isOwner && (
                        <Button
                            mode='text'
                            onPress={handleAvatar}
                        >
                            {isProfileImage ? 'Unset Avatar' : 'Set Avatar'}
                        </Button>
                    )}
                    {(
                        <Button
                            mode='text'
                            onPress={handleDelete}
                            disabled={loading}
                        >
                            Delete
                        </Button>
                    )}
                </Card.Actions>
            )} */}
        </View>
    )
}

export default FeedItem