import React, { useEffect, useState } from 'react'
import { View } from 'react-native'
import { Button } from 'react-native-paper'
import { ImagePreview } from '@components'
import { useMemory, useModal, useUser } from '@context'
import { getMaxImageDims, handleImageData, openFileSelector } from '@utils/images'
import EXIF from 'exif-js'

const MemoryImageSelector = ({ data }) => {

    const { clearModals, closeModal } = useModal()
    const { user, uploading, setImageUpload, setUploading } = useUser()
    const { uploadData, setUploadData } = useMemory()

    const [imageDims, setImageDims] = useState(null)
    const [maxDims, setMaxDims] = useState(null)
    const [preview, setPreview] = useState(null)
    const [payload, setPayload] = useState(null)

    // const [progress, setProgress] = useState(null)
    const [showActivity, setShowActivity] = useState(false)

    useEffect(() => {

        if (preview) {
            // set image dimensions to maximum size
            setImageDims(getMaxImageDims(preview.width, preview.height, maxWidth))
        } else {
            setImageDims(null)
            setUploadData(null)
        }
    }, [preview])

    useEffect(() => {

        // if image is loaded and data is available
        if (payload) {
            
            const { uri, height, width } = payload.imageData
            setPreview({ uri, height, width })
        }
        else {
            setPreview(null)
        }
    }, [payload])

    const openSelector = async () => {

        if (!showActivity) {
            setShowActivity(true)
        }

        const uri = await openFileSelector()

        setShowActivity(false)
        
        if (uri) {
            handleSelectedImage(uri)
        } else {
            console.log('no selection made')
        }
    }

    const dataURItoBlob = async dataURI =>  await (await fetch(dataURI)).blob()

    const handleSelectedImage = async uri => {

        const blob = await dataURItoBlob(uri)
        
        const reader = new FileReader()
        
        reader.onload = ({ target }) => {
            const exif = EXIF.readFromBinaryFile(target.result)
            loadImage(uri, exif, user._id)
        }

        reader.readAsArrayBuffer(blob)
    }

    const loadImage = async (src, exif, id) => {
        
        const image = new Image()
        
        image.onload = async () => {
            const imageResult = await handleImageData(id, image, exif)
            if (imageResult) {
                console.log('imageResult', imageResult)
                setPayload(imageResult)

            }
            
        }

        image.src = src
    }

    const handleUpload = async () => {

        if (process.env.NODE_ENV === 'development') return alert('can\'t upload in dev')
        
        const dataToUpload = {
            memoryId: data._id,
            preview,
            ...payload,
        }

        console.log('dataToUpload', dataToUpload)
        setUploadData(dataToUpload)
        setImageUpload(payload)
        
        closeModal()
    }

    const skipImage = () => {

        setUploadData(null)
        clearModals()
    }

    const onLayout = e => {
        
        setMaxDims({
            width: e.nativeEvent.target.clientWidth,
            height: e.nativeEvent.target.clientHeight,
        })
	}

    return (
        <View
            style={{
                flex: 1,
            }}
        >
            <View
                style={{
                    flex: 1,
                    justifyContent: 'space-between',
                    gap: 10,
                }}
            >
                    
                <View
                    style={{
                        flex: 1,
                        flexGrow: 1,
                        flexDirection: 'row',
                        // justifyContent: 'center',
                        alignItems: 'center',
                    }}
                >
                    <View
                        style={{
                            gap: 20,
                        }}
                    >

                        <Button
                            mode='contained-tonal'
                            onPress={skipImage}
                            disabled={uploadData}
                        >
                            Skip
                        </Button>

                        <Button
                            mode='outlined'
                            onPress={openSelector}
                            disabled={uploadData}
                        >
                            Select Image
                        </Button>

                        {imageDims && (
                            <Button
                                mode='contained'
                                onPress={handleUpload}
                                disabled={uploading}
                            >
                                Upload Image
                            </Button>
                        )}

                    </View>
                    {/* {showActivity && <ActivityIndicator size='medium' />} */}
                    <View
                        onLayout={onLayout}
                        style={{
                            flex: 1,
                        }}
                    >
                        {imageDims && (
                            <ImagePreview
                                preview={preview}
                                width={imageDims.width}
                                height={imageDims.height}
                                uploading={uploadData}
                            />
                        )}
                    </View>
                </View>
            </View>
        </View>
    )
}

export default MemoryImageSelector