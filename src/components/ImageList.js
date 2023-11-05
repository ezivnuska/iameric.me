import React, { useContext, useEffect, useState } from 'react'
import {
    ActivityIndicator,
    Image,
    Text,
    TouchableOpacity,
    View,
} from 'react-native'
import {
    ImageLoader,
} from '.'
import { getImageDataById } from '../Data'
import { AppContext } from '../AppContext'

const IMAGE_SIZE = 50
const IMAGE_PATH = __DEV__ ? 'https://iameric.me/assets' : '/assets'

export default ({ images, user, onSelected }) => {

    const [items, setItems] = useState(null)

    useEffect(() => {
        if (images) {
            console.log('ImageList: setting images >', images)
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
                    <ImageLoader
                        imageData={image}
                    />
                </TouchableOpacity>
            ))}
        </View>
    ) : null
}