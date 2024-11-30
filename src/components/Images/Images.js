import React, { useState } from 'react'
import { View } from 'react-native'
import { ImageList, ImageGrid } from '@components'

const Images = ({ images, onPress, upload, uploading, list = false }) => {
    
    return (
        <View>
            <ImageGrid
                images={images}
                onPress={onPress}
                uploading={uploading}
                upload={upload}
            />
            {/* <View>
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
                            type={type === 'grid' ? 'grid' : 'list'}
                        />
                    )}
            </View> */}
        </View>
    )
}

export default Images