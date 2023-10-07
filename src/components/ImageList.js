import React from 'react'
import {
    Text,
    TouchableOpacity,
    View,
} from 'react-native'
import {
    ImageDisplay,
    LoadingView,
} from '.'

export default ({ images, loading, path, setFeatured }) => {
    
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
                <TouchableOpacity
                    onPress={() => setFeatured(image)}
                    style={{
                        flex: 1,
                        flexBasis: 'auto',
                    }}
                    key={`image-${index}`}
                >
                    <ImageDisplay
                        size={100}
                        path={`${path}/thumb/${image.filename}`}
                    />
                </TouchableOpacity>
            ))}
        </View>
    )

    return (
        <View>
            {loading
                ? <LoadingView label='Loading Images...' />
                : (images && images.length)
                ? renderImages()
                : <Text>No images to display.</Text>
            }

            
        </View>
    )
}