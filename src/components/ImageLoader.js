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

const ImageLoader = ({ path, whenLoaded }) => {

    const [loading, setLoading] = useState(false)
    const [loaded, setLoaded] = useState(false)

    // useEffect(() => {
    //     console.log(`path: ${IMAGE_PATH}/${path}`)
    //     console.log('loading:', loading)
    // }, [])

    // useEffect(() => {
    //     console.log(`path changed: ${IMAGE_PATH}/${path}`)
    //     console.log('loading:', loading)
    // }, [path])
    
    // useEffect(() => {
    //     console.log('loading change:', loading)
    // }, [loading])

    const onLoadStart = () => {
        setLoading(true)
    }

    const onLoaded = () => {
        whenLoaded()
        setLoading(false)
        setLoaded(true)
    }

    return (
        <View style={styles.container}>
            <Image
                width={size}
                height={size}
                source={{ uri: `${IMAGE_PATH}/${path}` }}
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