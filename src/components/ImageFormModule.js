import React, { useContext, useState } from 'react'
import {
    View,
} from 'react-native'
import {
    FileSelector,
    IconButton,
    ImageWithURI,
} from '.'
import EXIF from 'exif-js'
import { AppContext } from '@context'

export default ({ onImageSelected, removeImage, uri }) => {

    const {
        dispatch,
        loading,
        user,
    } = useContext(AppContext)

    const dataURItoBlob = async dataURI =>  await (await fetch(dataURI)).blob()

    const handleDrop = async uri => {

        const reader = new FileReader()
        reader.onload = ({ target }) => {
            const exif = EXIF.readFromBinaryFile(target.result)
            loadImage(uri, exif)
        }

        const blob = await dataURItoBlob(uri)
        reader.readAsArrayBuffer(blob)
    }

    const loadImage = async (src, exif) => {
        const image = new Image()
        image.onload = async () => {
            const data = await handleImageData(image, exif)
            
            const { uri, height, width } = data.imageData
            
            onImageSelected(data)
            
            // dispatch({ type: 'SET_LOADING', loading: null })
        }
        image.src = src
    }

    const handleImageData = async (image, srcOrientation) => {
        const userId = user._id
        const imageData = await getImageData(image, srcOrientation)
        const thumbData = await getThumbData(image, srcOrientation)
        const filename = `${userId}-${Date.now()}.png`

        return {
            imageData: { ...imageData, filename },
            thumbData: { ...thumbData, filename },
            userId,
        }
    }

    const getImageData = async (image, srcOrientation) => {
        
        const { height, width } = image
        const canvas = document.createElement('canvas')
        const ctx = canvas.getContext('2d')

        let imageWidth = width
        let imageHeight = height

        if (srcOrientation > 4 && srcOrientation < 9) {
            imageWidth = height
            imageHeight = width
        }

        const MAX_WIDTH = 340

        if (imageWidth >= MAX_WIDTH) {
            imageWidth = MAX_WIDTH
            imageHeight *= MAX_WIDTH / width
        }

        canvas.width = imageWidth
        canvas.height = imageHeight

        ctx.clearRect(0, 0, canvas.width, canvas.height)
        ctx.drawImage(image, 0, 0, canvas.width, canvas.height)

        const imageURI = canvas.toDataURL('image/png:base64;')

        return {
            height: imageHeight,
            width: imageWidth,
            uri: imageURI,
        }
    }

    const getThumbData = async (image, srcOrientation) => {
        
        const { height, width } = image
        const canvas = document.createElement('canvas')
        const ctx = canvas.getContext('2d')

        let imageWidth = width
        let imageHeight = height

        if (srcOrientation > 4 && srcOrientation < 9) {
            imageWidth = height
            imageHeight = width
        }

        const THUMB_WIDTH = 50

        if (imageWidth >= THUMB_WIDTH) {
            imageWidth = THUMB_WIDTH
            imageHeight *= THUMB_WIDTH / width
        }

        canvas.width = imageWidth
        canvas.height = imageHeight

        ctx.clearRect(0, 0, canvas.width, canvas.height)
        ctx.drawImage(image, 0, 0, canvas.width, canvas.height)

        const imageURI = canvas.toDataURL('image/png:base64;')

        return {
            height: imageHeight,
            width: imageWidth,
            uri: imageURI,
        }
    }

    const renderControls = () => (
        <View style={{
            flexGrow: 1,
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-evenly',
            height: 50,
        }}>
            
            {uri ? (
                <IconButton
                    type='danger'
                    label='Delete'
                    onPress={removeImage}
                    disabled={loading}
                />
            ) : null}

            <FileSelector
                onSelected={handleDrop}
            />
        </View>
    )

    return (
        <View
            style={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'flex-start',
                marginVertical: 10,
                paddingHorizontal: 10,
                paddingVertical: 10,
                borderWidth: 1,
                borderColor: '#fff',
            }}
        >
            
            {uri ? (
                <View style={{ paddingRight: 10 }}>
                    <ImageWithURI
                        source={{ uri }}
                        style={{
                            width: 50,
                            height: 50,
                            resizeMode: 'stretch',
                        }}
                    />
                </View>
            ) : null}
                
            {renderControls()}

        </View>
    )
}