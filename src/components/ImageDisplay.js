import React, { useEffect, useState } from 'react'
import {
    ActivityIndicator,
    Image,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native'
import {
    HoverableView,
} from './'
import { CloseCircleOutlined } from '@ant-design/icons'
const size = 100
const IMAGE_PATH = __DEV__ ? 'https://iameric.me/assets/images' : '/assets/images'

const ImageDisplay = ({ deleteImage, path, setAvatar }) => {
    console.log(`ImageDisplay path: ${IMAGE_PATH}/${path}`)

    const [loading, setLoading] = useState(false)
    return (
        <View style={styles.container}>
            <HoverableView
                style={[
                    styles.mouseOffStyles,
                    {
                        visibility: loading ? 'hidden' : 'visible',
                        height: loading ? 0 : size,
                    },
                ]}
                onHover={[styles.mouseOffStyles, (!loading ? styles.mouseOnStyles : null)]}
            >
                <TouchableOpacity
                    style={[
                        styles.setAvatarButton,
                    ]}
                    onPress={() => setAvatar()}
                    disabled={loading}
                >
                    <Image
                        style={[
                            styles.image,
                            {
                                width: size,
                                height: size,
                            },
                        ]}
                        onLoadStart={() => setLoading(true)}
                        onLoadEnd={() => setLoading(false)}
                        source={`${IMAGE_PATH}/${path}`}
                    />
                </TouchableOpacity>
            </HoverableView>
            
            {loading && (
                <ActivityIndicator
                    size='small'
                    style={styles.indicator}
                />
            )}
            
            <TouchableOpacity
                style={[
                    styles.deleteButton,
                    {
                        display: loading ? 'none' : 'block',
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
    },
})