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
            // console.log('ImageList: setting images >', images)
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
                </TouchableOpacity>
            ))}
        </View>
    ) : null
}