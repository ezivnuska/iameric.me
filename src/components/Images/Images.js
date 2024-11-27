import React, { useState } from 'react'
import { View } from 'react-native'
import { ImageList, ImageGrid } from './components'

const Images = ({ images, onPress, upload, uploading, type = 'grid' }) => {
    
    return (
        <View>
            <View>
                {type === 'list'
                    ? (
                        <ImageList
                            images={images}
                            onPress={onPress}
                            uploading={uploading}
                            upload={upload}
                        />
                    ) : (
                        <ImageGrid
                            images={images}
                            onPress={onPress}
                            uploading={uploading}
                            upload={upload}
                        />
                    )}
            </View>
        </View>
    )
}

export default Images