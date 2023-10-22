import React, { useContext, useEffect, useState } from 'react'
import {
    Image,
    View,
} from 'react-native'
import { getImageDataById } from '../Data'
import { AppContext } from '../AppContext'

const IMAGE_SIZE = 50
const IMAGE_PATH = __DEV__ ? 'https://iameric.me/assets' : '/assets'

export default ({ image }) => {

    const { dispatch } = useContext(AppContext)

    const [imageData, setImageData] = useState(null)

    useEffect(() => {
        if (image) {
            if (typeof image === 'string') fetchImageData(image)
            else setImageData(image)
        }
    }, [image])

    const fetchImageData = async id => {
        const data = await getImageDataById(id)
        dispatch({ type: 'UPDATE_IMAGE', image: data })
        setImageData(data)
    }

    return (imageData && imageData.filename)
        ? (
            <Image
                width={IMAGE_SIZE}
                height={IMAGE_SIZE}
                source={{ uri: `${IMAGE_PATH}/${imageData.user.username}/thumb/${imageData.filename}` }}
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