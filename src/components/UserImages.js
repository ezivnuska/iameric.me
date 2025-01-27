import React, { useEffect, useMemo, useState } from 'react'
import { Image, Pressable, ScrollView, View } from 'react-native'
import { ActivityIndicator } from 'react-native-paper'
import { useTheme } from '@context'

const IMAGE_PATH = __DEV__ ? 'https://iameric.me/assets' : '/assets'

const ImageListItem = ({ image, dims }) => {
    const { height, width } = dims
    // useEffect(() => {
    //     console.log('image', image)
    // }, [])

    return (
        <Image
            source={{ uri: `${IMAGE_PATH}/${image.user.username}${width <= 200 ? `/thumb` : ''}/${image.filename}` }}
            resizeMode='cover'
            style={{
                width,
                height,
                marginHorizontal: 'auto',
            }}
        />
    )
}

const ImageGridItem = ({ image, size }) => (
    <Image
        source={{ uri: `${IMAGE_PATH}/${image.user.username}/thumb/${image.filename}` }}
        resizeMode='cover'
        style={{ width: size, height: size }}
    />
)

const UserImages = ({ images, onPress, list = false, ...props }) => {

    const { landscape, theme } = useTheme()

    const [maxDims, setMaxDims] = useState(null)
    
    const imageGap = useMemo(() => list ? 5 : 5, [list])

    const getImageDims = image => {
        
        let dimensions = null

        if (maxDims) {
            
            if (!list) {
                let tileSize = null
                const numImages = landscape ? 1 : 2
                if (!landscape) {
                    tileSize = (maxDims.width - (imageGap * (numImages - 1)) - numImages * 2) / numImages
                } else {
                    tileSize = (maxDims.height - (imageGap * ((numImages - 1) % numImages)) - numImages * 2) / numImages
                }

                dimensions = {
                    height: tileSize,
                    width: tileSize,
                }

            } else {
                let scale = 1
                
                if (image.width > maxDims.width || image.height > maxDims.height) {
                    scale = landscape
                        ? scale = maxDims.height / image.height
                        : scale = maxDims.width / image.width
                }

                dimensions = {
                    height: image.height * scale,
                    width: image.width * scale,
                }
            }
        }

        return dimensions
    }

    const onLayout = e => {

		if (e.nativeEvent.target.offsetParent) {
            
            setMaxDims({
                width: e.nativeEvent.target.offsetParent.clientWidth,
                height: e.nativeEvent.target.offsetParent.clientHeight,
            })
		}
	}

    const buttonStyle = {
        borderWidth: 1,
        borderColor: theme?.colors.border,
        shadowColor: theme?.colors.shadow,
        shadowOffset: {
            width: 1,
            height: 1,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3,
        elevation: 1,
        backgroundColor: theme?.colors.background,
    }
    
    return (
        <View
            {...props}
            onLayout={onLayout}
            style={{ flex: 1, width: '100%' }}
        >
            {maxDims ? (
                <ScrollView
                    horizontal={landscape}
                    showsHorizontalScrollIndicator={false}
                    showsVerticalScrollIndicator={false}
                    style={{ flex: 1 }}
                    contentContainerStyle={{
                        // flex: 1,
                        flexDirection: !list || landscape ? 'row' : 'column',
                        flexWrap: !list && !landscape ? 'wrap' : 'nowrap',
                        gap: imageGap,
                    }}
                >   
                    {images && images.map((image, index) => {
                        const imageDims = getImageDims(image)
                        return (
                            <Pressable
                                key={`image-${index}`}
                                onPress={() => onPress('SHOWCASE', image )}
                                style={[
                                    {
                                        width: !list ? imageDims.width : landscape ? imageDims.width : maxDims.width,
                                        height: !list ? imageDims.height : landscape ? maxDims.height : imageDims.height,
                                        flexDirection: 'row',
                                        alignItems: 'center',
                                        // background: '#000',
                                    },
                                    buttonStyle,
                                ]}
                            >
                                {!list
                                    ? <ImageGridItem image={image} size={imageDims.width} />
                                    : <ImageListItem image={image} dims={imageDims} />
                                }
                            </Pressable>
                        )
                    })}
                </ScrollView>
            ) : <ActivityIndicator size='medium' />}

        </View>
    )
}

export default UserImages