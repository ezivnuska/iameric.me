import React, { useEffect, useState } from 'react'
import { Pressable, View } from 'react-native'
import { IconButton, ProfileImage, TextCopy, Time } from '@components'
import { useFeed, useUser } from '@context'
import { navigate } from '@utils/navigation'

const FeedListItem = ({ item, onDelete = null }) => {
    
    const { user } = useUser()
    const { feedLoading } = useFeed()

    const [disabled, setDisabled] = useState(false)

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
        if (!feedLoading && disabled) setDisabled(false)
        // else if (feedLoading && !disabled) setDisabled(true)
    }, [feedLoading])

    const handleDelete = id => {
        setDisabled(true)
        onDelete(id)
    }
    
    return (
        <View
            key={`post-${item._id}`}
            style={{
                marginBottom: 20,
                gap: 10,
                borderwidth: 1,
                borderStyle: 'dotted',
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
                        onPress={() => navigate('Profile', { username: item.author?.username })}
                        style={{
                            flexDirection: 'row',
                            alignItems: 'flex-start',
                            flexGrow: 1,
                            flexShrink: 0,
                            gap: 10,
                        }}
                    >
                        <ProfileImage
                            contact={item.author}
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

                                {item.author?.username && (
                                    <TextCopy
                                        size={20}
                                        bold
                                        style={{ lineHeight: 25 }}
                                    >
                                        {item.author.username}
                                    </TextCopy>
                                )}

                                <Time
                                    time={item.createdAt}
                                    size={20}
                                    style={{ lineHeight: 25 }}
                                />

                            </View>

                            {(user._id === item.author?._id || user.role === 'admin') && (
                                <IconButton
                                    name='trash-outline'
                                    disabled={disabled}
                                    onPress={() => handleDelete(item._id)}
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
                {item.text}
            </TextCopy>
            
        </View>
    )
}

export default FeedListItem