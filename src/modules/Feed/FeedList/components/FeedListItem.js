import React, { useEffect, useState, useMemo } from 'react'
import {
    Image,
    Pressable,
    View,
} from 'react-native'
import {
    IconButton,
    ThemedText,
    Time,
} from '@components'
import { useApp } from '@app'
// import { useModal } from '@modal'
import { navigate } from '@utils/navigation'
// import { loadContactById } from '@utils/contacts'
// import { parser } from 'url-meta-scraper'

const IMAGE_PATH = __DEV__ ? 'https://iameric.me/assets' : '/assets'

export default ({ item, onDelete = null }) => {
    
    const { author, createdAt, text } = item

    const { user } = useApp()
    // const { setModal } = useModal()

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

    const getProfileImagePathFromUser = data => {
        return data.profileImage
            ? `${IMAGE_PATH}/${data.username}/${data.profileImage.filename}`
            : `${IMAGE_PATH}/avatar-default-small.png`}

    const imagePath = useMemo(() => getProfileImagePathFromUser(author), [author])

    if (!author) return <View />
    
    return (
        <View
            key={`post-${item._id}`}
        >

            <View
                style={{
                    flexDirection: 'row',
                    alignItems: 'flex-start',
                    alignContent: 'center',
                    gap: 10,
                    paddingVertical: 5,
                }}
            >
                <View
                    style={{
                        flexDirection: 'row',
                        flexGrow: 0,
                        gap: 12,
                    }}
                >
                    <Pressable
                        onPress={() => {
                            navigate('Contact', { screen: 'Details', params: { username: author.username } })
                        }}
                        style={{
                            flexDirection: 'row',
                            flexGrow: 0,
                            gap: 12,
                        }}
                    >
                        {imagePath && (
                            <View style={{ flexGrow: 0 }}>
                                <Image
                                    source={imagePath}
                                    style={{
                                        width: 24,
                                        height: 24,
                                    }}
                                />
                            </View>
                        )}

                        <ThemedText bold>{author.username}</ThemedText>
                    </Pressable>

                    <Time time={createdAt} />

                </View>

                <View
                    style={{
                        flexGrow: 1,
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'flex-end',
                        flexWrap: 'wrap',
                        gap: 10,
                    }}
                >
                    
                    {user._id === author._id && (
                        <IconButton
                            name='trash-outline'
                            size={22}
                            onPress={() => onDelete(item._id)}
                        />
                    )}

                </View>

            </View>

            <View
                style={{
                    marginLeft: 25,
                    paddingHorizontal: 10,
                    backgroundColor: '#eee',
                    borderRadius: 12,
                    overflow: 'hidden',
                }}
            >
                <ThemedText style={{ lineHeight: 30 }}>
                    {text}
                </ThemedText>

            </View>
            
        </View>
    )
}