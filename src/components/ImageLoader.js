import React, { useContext, useEffect, useState } from 'react'
import {
    Image,
    View,
} from 'react-native'
import { getImageDataById } from '../Data'
import { AppContext } from '../AppContext'

const IMAGE_SIZE = 50
const IMAGE_PATH = __DEV__ ? 'https://iameric.me/assets' : '/assets'

export default ({ imageData }) => {

    const { dispatch, user } = useContext(AppContext)

    const [image, setImage] = useState(null)

    useEffect(() => {
        console.log('imageData:', imageData)
        if (imageData) {
            if (typeof imageData === 'string') fetchImageData(imageData)
            else setImage(imageData)
        }
    }, [])

    useEffect(() => {
        console.log('>>> image >>>', image)
    }, [image])

    const fetchImageData = async id => {
        console.log('fetching image data for id', id)

        const data = await getImageDataById(id)
        console.log('ImageLoader:UPDATE_IMAGE:', data)
        dispatch({ type: 'UPDATE_IMAGE', image: data })
        setImage(data)
    }

    return image
        ? (
            <Image
                width={IMAGE_SIZE}
                height={IMAGE_SIZE}
                source={{ uri: `${IMAGE_PATH}/${user.username}/thumb/${image.filename}` }}
                style={{
                    resizeMode: 'stretch',
                    width: IMAGE_SIZE,
                    height: IMAGE_SIZE,
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
                }}
            />
        ) : (
            <View
                style={{
                    width: IMAGE_SIZE,
                    height: IMAGE_SIZE,
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
                    backgroundColor: '#ddd',
                }}
            />
        )
}