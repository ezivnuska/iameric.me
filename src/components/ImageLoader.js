import React, { useEffect, useState } from 'react'
import {
    ActivityIndicator,
    Image,
    StyleSheet,
    View,
} from 'react-native'
import {
    ImageDisplay,
} from './'
const size = 100
const IMAGE_PATH = __DEV__ ? 'https://iameric.me/assets/images' : '/assets/images'

// this component is not being used

const ImageLoader = ({ path, whenLoaded }) => {

    const [loading, setLoading] = useState(false)
    const [loaded, setLoaded] = useState(false)
    const [imagePath] = useState(path)
    useEffect(() => {
        console.log('IMAGE_LOADER')
        console.log(`path: ${IMAGE_PATH}/${imagePath}`)
        console.log('loading:', `${IMAGE_PATH}/${imagePath}`)
    }, [])

    useEffect(() => {
        console.log(`PATH: ${IMAGE_PATH}/${imagePath}`)
        console.log('loading:', loading)
    }, [path])
    
    // useEffect(() => {
    //     console.log('loading change:', loading)
    // }, [loading])

    const onLoadStart = () => {
        console.log('onLoadStart')
        setLoading(true)
    }
    
    const onLoaded = () => {
        console.log('onLoadEnd')
        whenLoaded()
        setLoading(false)
        setLoaded(true)
    }

    return (
        <View style={styles.container}>
            <Image
                width={size}
                height={size}
                source={{ uri: `${IMAGE_PATH}/${imagePath}` }}
                onLoadStart={onLoadStart}
                onLoadEnd={onLoaded}
                style={[
                    styles.image,
                    {
                        width: size,
                        height: size,
                        // display: loading ? 'block' : 'none',
                    },
                ]}
            />
            {!loaded ? (
                <ActivityIndicator
                    size='small'
                    style={styles.activity}
                />
            ) : null}
        </View>
    )
}

export default ImageLoader

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        width: size,
        height: size,
    },
    image: {
        // flex: 1,
        resizeMode: 'stretch',
        width: size,
        height: size,
        borderWidth: 1,
        borderColor: '#f00',
    },
    activity: {
        flex: 1,
    },
})