import React, { useEffect, useMemo, useState } from 'react'
import { View } from 'react-native'
import {
    IconButton,
    ImageList,
    ThemedText,
    Time,
} from '@components'
import { useApp } from '@app'
import { useBips } from '@bips'
import { getBipImages } from '@utils/images'
import { deleteBip } from '@utils/bips'

// const IMAGE_PATH = __DEV__ ? 'https://iameric.me/assets' : '/assets'

export default ({ item }) => {

    const { user } = useApp()

    const {
        removeBip,
        setBipImages,
    } = useBips()

    const [ loading, setLoading ] = useState(false)

    const getImages = async id => {
        setLoading(true)
        const bipImages = await getBipImages(id)
        setBipImages({
            bipId: id,
            images: bipImages,
        })
        setLoading(false)
    }

    useEffect(() => {
        if (!item._id) console.log('Error: cannot get images: item id is undefined.')
        else getImages(item._id)
    }, [])

    const deleteAndRemoveBip = async id => {
        setLoading(true)
        const deletedBip = await deleteBip(id)
        setLoading(false)
        if (deletedBip) {
            removeBip(id)
        }
    }

    return item ? (
        <View
            style={{ flex: 1 }}
            key={`bip-${item._id}`}
        >
            <View
                style={{
                    flexDirection: 'row',
                    alignItems: 'space-between',
                    alignContent: 'center',
                    gap: 10,
                    paddingVertical: 5,
                }}
            >
                <View
                    style={{
                        flexGrow: 1,
                        flexDirection: 'row',
                        justifyContent: 'flex-start',
                        gap: 10,
                    }}
                >
                    <ThemedText>{item.user.username}</ThemedText>
                    <Time time={item.createdAt} />
                </View>

                {item.user && item.user._id === user._id ? (
                    <IconButton
                        name='trash-outline'
                        size={22}
                        onPress={() => deleteAndRemoveBip(item._id)}
                    />
                ) : null}

            </View>

            {
                (item.images && item.images.length > 0)
                    ? (
                        <ImageList
                            images={item.images}
                            loading={loading}
                            disabled
                            small
                        />
                    )
                    : null
            }

            {/* <View
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
                        borderRadius: 12,
                        overflow: 'hidden',
                        borderWidth: 1,
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
                    
                    <IconButton
                        name='chatbox-ellipses-outline'
                        size={22}
                        onPress={() => setModal('FEEDBACK', item)}
                    />
                
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
                    paddingLeft: 37,
                    paddingTop: 2,
                    paddingBottom: 7,
                }}
            >
                <ThemedText style={{ lineHeight: 24 }}>{text}</ThemedText>
            </View> */}
        </View>
    ) : null
}