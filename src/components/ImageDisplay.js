import React, { useEffect, useState } from 'react'
import {
    Image,
    StyleSheet,
    TouchableOpacity,
    View,
} from 'react-native'
import {
    HoverableView,
    ImageLoader,
} from './'
import { CloseCircleOutlined } from '@ant-design/icons'
const IMAGE_PATH = __DEV__ ? 'https://iameric.me/assets/images' : '/assets/images'
const size = 100

const ImageDisplay = ({ deleteImage, path, setAvatar }) => {
    // console.log(`ImageDisplay path: ${IMAGE_PATH}/${path}`)
    //WARNING: This log command causes infinite loop.

    const [loading, setLoading] = useState(true)
    const [loaded, setLoaded] = useState(false)
    const [imagePath] = useState(path)
    
    return (
        <View style={styles.container}>
            <HoverableView
                style={[
                    styles.mouseOffStyles,
                    {
                        // visibility: loading ? 'hidden' : 'visible',
                        // height: loading ? 0 : size,
                    },
                ]}
                onHover={[styles.mouseOffStyles, styles.mouseOnStyles]}
            >
                <TouchableOpacity
                    style={[
                        styles.setAvatarButton,
                    ]}
                    onPress={() => setAvatar()}
                    disabled={loading}
                >
                    <Image
                        width={size}
                        height={size}
                        source={{ uri: `${IMAGE_PATH}/${imagePath}` }}
                        onLoadEnd={() => {
                            setLoading(false)
                            setLoaded(true)
                        }}
                        
                        style={[
                            styles.image,
                            {
                                width: size,
                                height: size,
                                // display: loading ? 'block' : 'none',
                            },
                        ]}
                    />
                </TouchableOpacity>
            </HoverableView>
            
            <TouchableOpacity
                style={[
                    styles.deleteButton,
                    {
                        // display: loading ? 'none' : 'block',
                    },
                ]}
                onPress={() => {
                    deleteImage()
                }}
                disabled={loading}
            >
                <CloseCircleOutlined style={styles.deleteIcon} />
            </TouchableOpacity>
        </View>
    )
}

export default ImageDisplay

const styles = StyleSheet.create({
    container: {
        display: 'relative',
        width: size,
        height: size,
    },
    setAvatarButton: {
        width: size,
        height: size,
    },
    mouseOffStyles: {
        position: 'absolute',
        zIndex: 5,
        // borderWidth: 1,
        // borderColor: '#ccc',
    },
    mouseOnStyles: {
        backgroundColor: '#fff',
        opacity: 0.3,
    },
    deleteButton: {
        position: 'absolute',
        top: 0,
        right: 0,
        zIndex: 10,
        backgroundColor: '#000',
        padding: 3,
    },
    deleteIcon: {
        color: '#fff',
    },
    image: {
        resizeMode: 'stretch',
        width: size,
        height: size,
        borderWidth: 1,
        borderColor: '#f00',
    },
})