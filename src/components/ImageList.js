import React, { useEffect, useRef, useState } from 'react'
import { FlatList, Image, Pressable, View } from 'react-native'
import { ActivityIndicator } from 'react-native-paper'
import { useTheme, useUser } from '@context'
import { Paths } from '@constants'
import { loadImage } from '@utils/images'

const ImageListItem = ({ uri, dims }) => {
    const { height, width } = dims
    return (
        <Image
            source={{ uri }}
            resizeMode='contain'
            // resizeMode='cover'
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

    const { dims, landscape } = useTheme()
    const { findUserImage, updateImage } = useUser()

    const [item, setItem] = useState(null)
    const [loading, setLoading] = useState(false)
    const [imageDims, setImageDims] = useState(false)

    useEffect(() => {
        init(imageId)
    }, [])

    useEffect(() => {
        if (item) {
            const itemDims = getImageDims(item)
            setImageDims(itemDims)
        }
    }, [item, dims])
    

    const init = async id => {
        
        setLoading(true)

        let loadedImage = findUserImage(user._id, id)
        
        if (!loadedImage) {
            
            loadedImage = await loadImage(id)
            
            if (loadedImage) {
                // console.log('ImageList:init', loadedImage)
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
        
        const uri = `${Paths.ASSETS}/${user.username}${imageDims.width <= 200 ? `/thumb` : ''}/${item.filename}`
        return (
            <Pressable
                onPress={() => onPress(item)}
                style={{
                    flex: 1,
                    flexDirection: 'row',
                    alignItems: 'center',
                    marginHorizontal: 'auto',
                    // marginTop: 10,
                }}
            >
                {(list || landscape)
                    ? <ImageListItem uri={uri} dims={imageDims} />
                    : <ImageGridItem uri={uri} size={imageDims.width} />
                }
            </Pressable>
        )
    }

    if (loading) return <ActivityIndicator size='small' />

    return item && renderItem(item)
}

const ImageList = ({ images, refreshing, user, onPress, onRefresh, list = false }) => {

    const { landscape, styles, theme } = useTheme()
    const { uploadedImage, setUploadedImage } = useUser()

    const [maxDims, setMaxDims] = useState(null)

    const listRef = useRef()

    useEffect(() => {

        if (uploadedImage) {
            setUploadedImage(null)
            listRef.current.scrollToEnd({ animated: true })
        }
    }, [images])

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
            style={[
            //     // styles.border,
                { flex: 1, },
            ]}
        >
            {maxDims && (
                <FlatList
                    ItemSeparatorComponent={() => <View style={{ height: separation, width: separation }} />}
                    ref={listRef}
                    key={`image-list-${user._id}-${getNumColumns()}`}
                    horizontal={landscape}
                    // contentOffset={{ x: 0, y: 0 }}
                    numColumns={getNumColumns()}
                    data={images}
                    extraData={images}
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
                    // style={{ paddingVertical: 10 }}
                />
            )}
        </View>
    )
}

export default ImageList