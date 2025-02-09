import React, { useEffect, useState } from 'react'
import { Button, Card, IconButton } from 'react-native-paper'
import { Form, ImagePreview } from '@components'
import { useFeed, useForm, useModal, useSocket, useUser } from '@context'
import { createPost } from '@utils/feed'

import {
    getMaxImageDims,
    handleImageData,
    openFileSelector,
} from '@utils/images'
import EXIF from 'exif-js'

const PostForm = ({ data = null }) => {

    const fields = [
        {
            name: 'text',
            placeholder: 'share something...',
            multiline: true,
        },
    ]

    const {
        updatePost,
    } = useFeed()
    const {
        formError,
    } = useForm()
    const { closeModal } = useModal()
    const { socket } = useSocket()
    const {
        user,
        uploading,
        setUploading,
    } = useUser()

    const [preview, setPreview] = useState(null)
    const [payload, setPayload] = useState(null)
    const [maxWidth, setMaxWidth] = useState(200)
    const [imageDims, setImageDims] = useState(null)

    useEffect(() => {
    
        // if image is loaded and data is available
        if (payload) {

            // set preview from available data
            const { uri, height, width } = payload.imageData
            setPreview({ uri, height, width })

        } else {
            setPreview(null)
        }
    }, [payload])

    useEffect(() => {

        // if image selected and preview available
        if (preview) {

            // set image dimensions to maximum size
            setImageDims(getMaxImageDims(preview.width, preview.height, maxWidth))

        } else {
            setImageDims(null)
        }

    }, [preview])

    // useEffect(() => {
    //     if (imageUpload) {
    //         if (process.env.NODE_ENV === 'development') return alert('can\'t upload in dev')
    //         setUploading(preview)
    //         // setImageUpload(null)
    //     }
        
    // }, [imageUpload])

    // useEffect(() => {
    //     if (uploadedImage) {
    //         setNewPost({
    //             ...newPost,
    //             images: [uploadedImage._id]
    //             // images: [...newPost.images, uploadedImage._id]
    //         })
    //         setUploadedImage(null)
    //     }
    // }, [uploadedImage])

    // const initUpload = () => {
    //     const { imageData, thumbData, userId } = payload
    //     const data = { imageData, thumbData, userId }
    //     setImageUpload(data)
    //     // handleUpload({ imageData, thumbData, userId })
    // }

    // const handleUpload = async () => {

    //     if (process.env.NODE_ENV === 'development') return alert('can\'t upload in dev')

    //     const { imageData, thumbData, userId } = payload
    //     const data = { imageData, thumbData, userId }

    //     setImageUpload(data)

    //     setUploading(preview)
            
    //     // closeModal()
    // }

    const handleSubmit = async formData => {
        
        let postData = { ...formData }
        console.log('submitting form data', formData)
        if (payload) {
            const { imageData, thumbData } = payload
            
            postData.image = { imageData, thumbData }

            setUploading(preview)
        }

        const post = await createPost(postData)
        
        setUploading(null)

        if (post) {
            socket.emit('new_post', post)

            updatePost(post)
        }

        closeModal()
    }

    const openSelector = async () => {
        const uri = await openFileSelector()
        
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
            const data = await handleImageData(id, image, exif)
            
            if (data) setPayload(data)
            else console.log('error loading image')
        }

        image.src = src
    }

    return (
        <Card>

            <Card.Title
                title='Create Post'
                titleVariant='headlineLarge'
                right={() => <IconButton icon='close-thick' onPress={closeModal} />}
            />
            
            <Card>

                <Card.Title
                    title='Share something.'
                    titleVariant='headlineSmall'
                    // subtitle=''
                    // subtitleVariant='bodyLarge'
                />

                <Card.Content style={{ marginTop: 10 }}>
                    <Form
                        title='Say Something'
                        fields={fields}
                        onCancel={closeModal}
                        onSubmit={handleSubmit}
                    >
                        {imageDims ? (
                            <ImagePreview
                                uri={preview?.uri}
                                uploading={uploading}
                            />
                        ) : (
                            <Button
                                icon='file-image-plus'
                                mode='contained'
                                onPress={openSelector}
                                disabled={formError}
                            >
                                Add Image
                            </Button>
                        )}
                    </Form>
                </Card.Content>
            </Card>
        </Card>
    )
}

export default PostForm