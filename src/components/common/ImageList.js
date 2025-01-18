import React, { useEffect, useRef, useState } from 'react'
import { FlatList, Image, Pressable, View } from 'react-native'
import { ActivityIndicator } from '@components'
import { useApp, useUser } from '@context'
import { loadImage } from '@utils/images'

const IMAGE_PATH = __DEV__ ? 'https://iameric.me/assets' : '/assets'

const ImageListItem = ({ uri, dims }) => {
    const { height, width } = dims
    return (
        <Image
            source={{ uri }}
            resizeMode='cover'
            style={{
                width,
                height,
                marginHorizontal: 'auto',
            }}
        />
    )
}

const ImageGridItem = ({ uri, size }) => {
    return (
        <Image
            source={{ uri }}
            resizeMode='cover'
            style={{ width: size, height: size }}
        />
    )
}

const ListItem = ({ user, imageId, maxDims, list, onPress }) => {

    const { landscape } = useApp()
    const { findUserImage, updateImage } = useUser()

    const [item, setItem] = useState(null)
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        init(imageId)
    }, [])

    const init = async id => {
        
        setLoading(true)

        let loadedImage = findUserImage(user._id, id)
        
        if (!loadedImage) {
            
            loadedImage = await loadImage(id)
            
            if (loadedImage) {
                updateImage(loadedImage)
            }
        }
        
        if (loadedImage) {
            setItem(loadedImage)
        }
        
        setLoading(false)
    }
    
    const getImageDims = image => {
        
        let dimensions = null

        let maxHeight = maxDims.height

        if (maxHeight > 300) maxHeight = 300

        if (list) {
            let scale = 1

            if (landscape) {
                if (image.height > maxDims.height) {
                    scale = maxHeight / image.height
                }
            } else {
                if (image.width > maxDims.width) {
                    scale = maxDims.width / image.width
                }
            }
            
            dimensions = {
                height: image.height * scale,
                width: image.width * scale,
            }
        } else {
            const numImages = 2
            dimensions = {
                height: maxDims.width / numImages,
                width: maxDims.width / numImages,
            }
        }
        
        return dimensions
    }

    const renderItem = () => {
        const dims = getImageDims(item)
        const uri = `${IMAGE_PATH}/${user.username}${dims.width <= 200 ? `/thumb` : ''}/${item.filename}`
        return (
            <Pressable
                onPress={() => onPress(item)}
                style={{
                    flex: 1,
                    flexDirection: 'row',
                    alignItems: 'center',
                    marginHorizontal: 'auto',
                    // borderWidth: 1,
                }}
            >
                {(list || landscape)
                    ? <ImageListItem uri={uri} dims={dims} />
                    : <ImageGridItem uri={uri} size={dims.width} />
                }
            </Pressable>
        )
    }

    return loading || !item
        ? <ActivityIndicator size='small' />
        : item && renderItem(item)
}

const ImageList = ({ imageIds, refreshing, user, onPress, onRefresh, list = false }) => {

    const { landscape, theme } = useApp()
    const { uploadedImage, setUploadedImage } = useUser()

    const [maxDims, setMaxDims] = useState(null)

    const listRef = useRef()

    useEffect(() => {

        if (uploadedImage) {
            setUploadedImage(null)
            listRef.current.scrollToEnd({ animated: true })
        }
    }, [imageIds])

    const onLayout = e => {
        
		if (e.nativeEvent.target.offsetParent) {
            
            setMaxDims({
                width: e.nativeEvent.target.offsetParent.clientWidth,
                height: e.nativeEvent.target.offsetParent.clientHeight,
            })
		}
	}

    const getNumColumns = () => (!list && !landscape) ? 2 : 1

    const separation = list ? 50 : 0
    
    return (
        <View
            onLayout={onLayout}
            style={{ flex: 1 }}
        >
            {maxDims && (
                <FlatList
                    ItemSeparatorComponent={() => <View style={{ height: separation, width: separation }} />}
                    ref={listRef}
                    key={`image-list-${user._id}-${getNumColumns()}`}
                    horizontal={landscape}
                    contentOffset={{ x: separation, y: 0 }}
                    numColumns={getNumColumns()}
                    data={imageIds}
                    keyExtractor={item => `image-${item._id}`}
                    onRefresh={onRefresh}
                    refreshing={refreshing}
                    initialNumToRender={6}
                    renderItem={({ item }) => (
                        <ListItem
                            user={user}
                            imageId={item._id}
                            maxDims={maxDims}
                            list={list}
                            onPress={onPress}
                        />
                    )}
                />
            )}
        </View>
    )
}

export default ImageList