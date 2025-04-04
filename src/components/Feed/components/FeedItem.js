import React, { useEffect, useMemo, useState } from 'react'
import { View } from 'react-native'
import { IconButton, Text } from 'react-native-paper'
import Autolink from 'react-native-autolink'
import { ImageLoader, Row, SmartAvatar, Stack } from '@components'
import { useFeed, useModal, useTheme, useUser } from '@context'
import { loadThread } from '@utils/feed'
import { getTime } from '@utils/time'
import { Size } from '@utils/stack'
import scrape from '@utils/scrape'

const FeedItem = ({ post, onDelete }) => {
   
    const { updatePost } = useFeed()
    const { addModal } = useModal()
    const { landscape } = useTheme()
    const { user } = useUser()

    const owned = useMemo(() => post?.author && user._id === post.author._id, [post])
    const authorized = useMemo(() => (owned || user.role === 'admin'), [post])

    const isPortrait = useMemo(() => post?.image && post.image.height >= post.image.width, [post])

    // const [body, setBody] = useState(null)

    const { width, height } = useMemo(() => {
        if (landscape && isPortrait) return { width: '40%', height: 240 }
        if (landscape && !isPortrait) return { width: '40%', height: 200 }
        if (!landscape && isPortrait) return { width: '100%', height: 280 }
        if (!landscape && !isPortrait) return { width: '100%', height: 180 }
    },[landscape])

    // var urlRegex = /(https?:\/\/[^\s]+)/g
    // var urlRegex = /(\b(https?|ftp|file):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/ig;
    // var urlRegex = /((?:(http|https|Http|Https|rtsp|Rtsp):\/\/(?:(?:[a-zA-Z0-9\$\-\_\.\+\!\*\'\(\)\,\;\?\&\=]|(?:\%[a-fA-F0-9]{2})){1,64}(?:\:(?:[a-zA-Z0-9\$\-\_\.\+\!\*\'\(\)\,\;\?\&\=]|(?:\%[a-fA-F0-9]{2})){1,25})?\@)?)?((?:(?:[a-zA-Z0-9][a-zA-Z0-9\-]{0,64}\.)+(?:(?:aero|arpa|asia|a[cdefgilmnoqrstuwxz])|(?:biz|b[abdefghijmnorstvwyz])|(?:cat|com|coop|c[acdfghiklmnoruvxyz])|d[ejkmoz]|(?:edu|e[cegrstu])|f[ijkmor]|(?:gov|g[abdefghilmnpqrstuwy])|h[kmnrtu]|(?:info|int|i[delmnoqrst])|(?:jobs|j[emop])|k[eghimnrwyz]|l[abcikrstuvy]|(?:mil|mobi|museum|m[acdghklmnopqrstuvwxyz])|(?:name|net|n[acefgilopruz])|(?:org|om)|(?:pro|p[aefghklmnrstwy])|qa|r[eouw]|s[abcdeghijklmnortuvyz]|(?:tel|travel|t[cdfghjklmnoprtvwz])|u[agkmsyz]|v[aceginu]|w[fs]|y[etu]|z[amw]))|(?:(?:25[0-5]|2[0-4][0-9]|[0-1][0-9]{2}|[1-9][0-9]|[1-9])\.(?:25[0-5]|2[0-4][0-9]|[0-1][0-9]{2}|[1-9][0-9]|[1-9]|0)\.(?:25[0-5]|2[0-4][0-9]|[0-1][0-9]{2}|[1-9][0-9]|[1-9]|0)\.(?:25[0-5]|2[0-4][0-9]|[0-1][0-9]{2}|[1-9][0-9]|[0-9])))(?:\:\d{1,5})?)(\/(?:(?:[a-zA-Z0-9\;\/\?\:\@\&\=\#\~\-\.\+\!\*\'\(\)\,\_])|(?:\%[a-fA-F0-9]{2}))*)?(?:\b|$)/gi

    // useEffect(() => {
    //     const text = urlify(post.text)
    //     console.log('text', text)
    //     setBody(text)
    // }, [post])

    // const renderText = text => (
    //     <Text
    //         variant='titleLarge'
    //         style={{ flex: 1, paddingVertical: 7 }}
    //     >
    //         {text.replace(urlRegex, url => {
    //             return (
    //                 <ExternalLink url={url}>
    //                     {url}
    //                 </ExternalLink>
    //             )
    //         })}
    //     </Text>
    // )

    useEffect(() => {
        fetchThread()
    }, [])

    const scrapeUrl = async url => {
        const metadata = await scrape(url)
        console.log('metadata scraped:', metadata)
    }

    const fetchThread = async () => {
        const comments = await loadThread(post._id)
        if (comments) updatePost({ ...post, comments })
    }

    return post && (
        <Stack>

            <Row
                flex={1}
                spacing={Size.M}
                padding={[Size.None, Size.XS, Size.None, Size.S]}
                align='center'
                style={{ marginBottom: (post.image && Size.S) }}
            >

                <SmartAvatar
                    user={post.author}
                    size={landscape ? 30 : 40}
                />
    
                <Stack flex={1}>
                    
                    <Text variant='titleMedium'>{post.author.username}</Text>
    
                    <Text variant='titleMedium' style={{ color: '#aaa' }}>
                        {getTime(post.createdAt, 'relative')}
                    </Text>
    
                </Stack>
    
                {authorized && (
                    <IconButton
                        icon='delete-forever'
                        onPress={() => onDelete(post)}
                        size={25}
                        style={{ margin: 0 }}
                    />
                )}
    
            </Row>

            <Stack
                direction={(post?.image && landscape && 'row')}
                padding={[Size.None, Size.S, Size.None, Size.S]}
                spacing={Size.S}
            >
                
                {post.image && (
                    <ImageLoader
                        image={post.image}
                        user={post.author}
                        maxDims={{ width, height }}
                    />
                )}
                
                <Row
                    flex={1}
                    spacing={Size.S}
                    padding={[Size.None, Size.None, Size.None, Size.XS]}
                    align='flex-start'
                >
                    <View style={{ flex: 1 }}>
                        <Autolink
                            text={post.text}
                            component={Text}
                            style={{ paddingVertical: 7, fontSize: 16 }}
                            // linkStyle={{ color: 'red' }}
                        />
                    </View>
                    
                    {owned && (
                        <IconButton
                            icon='comment-edit-outline'
                            onPress={() => addModal('FEEDBACK', post)}
                            style={{ margin: 0 }}
                        />
                    )}

                </Row>

            </Stack>

        </Stack>
    )
}

export default FeedItem