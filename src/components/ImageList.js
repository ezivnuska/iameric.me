import React, { useEffect, useState } from 'react'
import {
    Image,
    Text,
    TouchableOpacity,
    View,
} from 'react-native'
import {
    LoadingView,
} from '.'
import { getImageDataById } from '../Data'

const IMAGE_SIZE = 50
const IMAGE_PATH = __DEV__ ? 'https://iameric.me/assets' : '/assets'

const SimpleImage = ({ image, username }) => {

    const [imageData, setImageData] = useState(null)

    useEffect(() => {
        if (typeof image === 'string') fetchImageData(image)
        else setImageData(image)
    }, [])

    const fetchImageData = async id => {
        const data = await getImageDataById(id)
        setImageData(data)
    }

    return imageData ? (
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
    ) : null
}

const ImageButton = ({image, user, onPress, ...props}) => (
    <TouchableOpacity
        onPress={onPress}
        style={{
            // flex: 1,
            flexBasis: 'auto',
        }}
        {...props}
    >
        <SimpleImage
            username={user.username}
            image={image}
        />
    </TouchableOpacity>
)

export default ({ images, loading, user, setFeatured }) => loading
    ? <LoadingView label='Loading Images...' />
    : images && images.length
    ? (
        <View style={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'flex-start',
            flexWrap: 'wrap',
            gap: 10,
            width: '100%',
        }}>
            {images.map((image, index) => (
                <ImageButton
                    image={image}
                    key={`image-${index}`}
                    user={user}
                    onPress={() => setFeatured(image)}
                />
            ))}
        </View>
    )
    : <Text>No images to display.</Text>