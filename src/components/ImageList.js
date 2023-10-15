import React, { useContext, useEffect, useState } from 'react'
import {
    ActivityIndicator,
    Image,
    Text,
    TouchableOpacity,
    View,
} from 'react-native'
import {
    LoadingView,
} from '.'
import { getImageDataById } from '../Data'
import { AppContext } from '../AppContext'

const IMAGE_SIZE = 50
const IMAGE_PATH = __DEV__ ? 'https://iameric.me/assets' : '/assets'

const SimpleImage = ({ image, username }) => {

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
                source={{ uri: `${IMAGE_PATH}/${username}/thumb/${imageData.filename}` }}
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

export default ({ images, user, onSelected }) => {

    const [items, setItems] = useState(null)

    useEffect(() => {
        if (images) {
            // if (items) console.log('ImageList: setting images >', images)
            setItems(images)}
    }, [images])

    return items ? (
        <View
            style={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'flex-start',
                flexWrap: 'wrap',
                gap: 10,
                width: '100%',
            }}
        >
            {items.map((image, index) => (
                <TouchableOpacity
                    onPress={() => onSelected(image)}
                    style={{
                        // flex: 1,
                        flexBasis: 'auto',
                    }}
                    key={`image-${index}`}
                >
                    <SimpleImage
                        username={user.username}
                        image={image}
                    />
                </TouchableOpacity>
            ))}
        </View>
    ) : null
}