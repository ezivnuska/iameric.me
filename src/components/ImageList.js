import React, { useContext, useEffect, useState } from 'react'
import {
    Text,
    View,
} from 'react-native'
import {
    ImageDetail,
    ImageDisplay,
    LoadingView,
} from './'
import axios from 'axios'
import { AppContext } from '../AppContext'

const ImageList = () => {

    const {
        dispatch,
        user,
    } = useContext(AppContext)

    const [ images, setImages ] = useState(null)
    const [ loading, setLoading ] = useState(false)

    useEffect(() => {
        getImages()
    }, [])

    const getImages = async () => {
        
        setLoading(true)

        const { data } = await axios.
            get(`/api/user/images/${user._id}`)

        setImages(data.images)
        
        setLoading(false)
    }

    const renderImages = () => (
        <View style={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'flex-start',
            flexWrap: 'wrap',
            gap: 10,
            width: '100%',
        }}>
            {images.map((image, index) => (
                <View
                    style={{
                        flex: 1,
                        flexBasis: 'auto',
                    }}
                    key={`image-${index}`}
                >
                    <ImageDisplay image={image} />
                </View>
            ))}
        </View>
    )

    return loading ? <LoadingView label='Loading Images...' />
        : (images && images.length) ? renderImages()
        : <Text>No images to display.</Text>
}

export default ImageList