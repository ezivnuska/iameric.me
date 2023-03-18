import React, { useEffect, useState } from 'react'
import {
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

const ImageDisplay = ({ deleteImage, path, setAvatar }) => {

    const [ source, setSource ] = useState(null)
    const [ updated, setUpdated ] = useState(null)

    const loadSource = async () => {
        setUpdated(true)
        try {
            const image = await import(`../assets/images/users/${path}`)
            setSource(image.default)
        } catch {
            console.log('could not import image')
            setUpdated(false)
        }
    }

    useEffect(() => {
        loadSource()
    }, [])

    useEffect(() => {
        if (updated) {
            setUpdated(false)
        }
    }, [source])

    return source ? (
        <View style={styles.container}>
            <HoverableView
                style={styles.mouseOffStyles}
                onHover={[styles.mouseOffStyles, styles.mouseOnStyles]}
            >
                <TouchableOpacity
                    style={styles.setAvatarButton}
                    onPress={() => {
                        setAvatar()
                    }}
                />
            </HoverableView>
            <TouchableOpacity
                style={styles.deleteButton}
                onPress={() => {
                    deleteImage()
                }}
            >
                <CloseCircleOutlined style={styles.deleteIcon} />
            </TouchableOpacity>
            <Image
                style={[
                    styles.image,
                    {
                        width: size,
                        height: size,  
                    },
                ]}
                source={{
                    uri: source
                }}
                // source={async () => await import(path)}
            />
        </View>
    ) : null
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
        // borderColor: 'red',
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
        zindex: 1,
    },
})