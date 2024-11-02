import React, { useEffect, useMemo } from 'react'
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
                <Pressable
                    onPress={() => {
                        navigate('Contact', { screen: 'Details', params: { username: author.username } })
                    }}
                    style={{
                        flexGrow: 0,
                        // borderRadius: 12,
                        // overflow: 'hidden',
                        // borderWidth: 1,
                    }}
                >
                    <Image
                        source={imagePath}
                        style={{
                            width: 24,
                            height: 24,
                        }}
                    />
                </Pressable>

                <View
                    style={{
                        flexDirection: 'row',
                        // justifyContent: 'space-between',
                        flexGrow: 1,
                        gap: 10,
                    }}
                >
                    <ThemedText>{author.username}</ThemedText>
                    <Time time={createdAt} />
                </View>


                <View
                    style={{
                        flexGrow: 0,
                        flexDirection: 'row',
                        alignItems: 'flexStart',
                        justifyContent: 'space-between',
                        flexWrap: 'wrap',
                        gap: 10,
                    }}
                >
                    
                    {/* <IconButton
                        name='chatbox-ellipses-outline'
                        size={22}
                        onPress={() => setModal('FEEDBACK', item)}
                    /> */}
                
                    {user._id === item.author._id && (
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
                    // paddingTop: 2,
                    // paddingBottom: 7,
                    paddingHorizontal: 10,
                    backgroundColor: '#eee',
                    borderRadius: 12,
                    overflow: 'hidden',
                }}
            >
                <ThemedText
                    style={{ lineHeight: 30 }}
                >{text}</ThemedText>
            </View>
        </View>
    )
}