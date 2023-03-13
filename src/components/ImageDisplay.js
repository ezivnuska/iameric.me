import React, { useEffect, useState } from 'react'
import {
    Image,
    StyleSheet,
    View,
} from 'react-native-web'

const ImageDisplay = ({ path }) => {

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

    return (
        <View style={styles.container}>
            {source ? (
                <Image
                    style={[
                        styles.image,
                        {
                            width: 100,
                            height: 100,  
                        },
                    ]}
                    source={{
                        uri: source
                    }}
                    // source={async () => await import(path)}
                />
            ) : null}
        </View>
    )
}

export default ImageDisplay

const styles = StyleSheet.create({
    container: {
        // width: 100,
        // height: 100,
    },
    image: {
        resizeMode: 'stretch',
    },
})