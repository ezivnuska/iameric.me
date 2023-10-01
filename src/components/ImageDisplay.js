import React, { useContext, useState } from 'react'
import {
    Image,
    StyleSheet,
    TouchableOpacity,
    View,
} from 'react-native'
import {
    HoverableView,
    ImageDetail,
    ImageLoader,
    ModalContainer,
} from './'
import { AppContext } from '../AppContext'

const IMAGE_PATH = __DEV__ ? 'https://iameric.me/assets/images' : '/assets/images'
const size = 100

const ImageDisplay = ({ image }) => {
    // console.log(`ImageDisplay path: ${IMAGE_PATH}/${path}`)
    //WARNING: This log command causes infinite loop.

    const {
        user,
    } = useContext(AppContext)

    const [loading, setLoading] = useState(true)
    const [loaded, setLoaded] = useState(false)
    const [featured, setFeatured] = useState(null)
    const [imagePath] = useState(`${user.username}/${image.filename}`)
    
    return (
        <View style={styles.container}>
            <HoverableView
                style={styles.mouseOffStyles}
                onHover={[styles.mouseOffStyles, styles.mouseOnStyles]}
            >
                <TouchableOpacity
                    style={[
                        styles.setAvatarButton,
                    ]}
                    onPress={() => setFeatured()}
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
                        
                        style={styles.image}
                    />
                </TouchableOpacity>
            </HoverableView>
            
            <ModalContainer
                animationType='slide'
                transparent={false}
                visible={featured}
                closeModal={() => setFeatured(null)}
                label='Image Details'
            >
                <ImageDetail
                    image={image}
                    // width={200}
                    done={() => setFeatured(false)}
                />
            </ModalContainer>
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
    image: {
        resizeMode: 'stretch',
        width: size,
        height: size,
        borderWidth: 1,
        borderColor: '#999',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
})