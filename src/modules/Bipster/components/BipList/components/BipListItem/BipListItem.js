import React, { useEffect, useMemo, useState } from 'react'
import { View } from 'react-native'
import { ImageList } from './components'
import {
    IconButton,
    ThemedText,
    Time,
} from '@components'
import { useApp } from '@app'
import { useBips } from '@bips'
import { getBipImages } from '@utils/images'
import { deleteBip } from '@utils/bips'
import {
    uploadBipImage,
} from '@utils/images'

export default ({ item }) => {

    const { user } = useApp()

    const {
        addBipImage,
        getBip,
        removeBip,
        setBipImages,
        resolveUpload,
    } = useBips()

    const [ loading, setLoading ] = useState(false)

    // const uploads = useMemo(() => getBip(item._id).uploads, [item])

    // const uploadImage = async data => {
    //     const uploadedImage = await uploadBipImage(item._id, data)
    //     if (uploadedImage) {
    //         addBipImage({ bipId: item._id, image: uploadedImage })
    //         resolveUpload({ bipId: item._id, filename: uploadedImage.filename })
    //     }
    // }

    // const uploadImages = async images => {
    //     images.map(image => uploadImage(image))
    // }

    // useEffect(() => {
    //     if (item.uploads) {
    //         uploadImages(item.uploads)
    //     }
    // }, [])

    // useEffect(() => {
    //     console.log('uploads changed', uploads)
    // }, [uploads])

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
            style={{ flex: 1, paddingBottom: 5 }}
            key={`bip-${item._id}`}
        >
            <View
                style={{
                    flexGrow: 1,
                    flexDirection: 'row',
                    justifyContent: 'flex-start',
                    gap: 7,
                }}
            >
                <ThemedText>{item.user.username}</ThemedText>
                <Time time={item.createdAt} />
                {item.user && item.user._id === user._id ? (
                    <IconButton
                        name='close-sharp'
                        size={20}
                        color='tomato'
                        onPress={() => deleteAndRemoveBip(item._id)}
                    />
                ) : null}
            </View>

            {/* {(uploads && uploads.length > 0)
                ? <ThemedText>{`Uploading ${uploads.length} image${uploads.length !== 1 ? 's' : ''}`}</ThemedText>
                : null
            } */}

            {
                (item.images && item.images.length > 0)
                    ? (
                        <ImageList
                            images={item.images}
                            loading={loading}
                            // disabled
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