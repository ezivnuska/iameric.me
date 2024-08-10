import React, { useEffect, useState } from 'react'
import {
    Pressable,
    ScrollView,
    View,
} from 'react-native'
import PreviewList from './components/PreviewList'
import {
    Heading,
    SimpleButton,
} from '@components'
import { useApp } from '@app'
import { useBips } from '@bips'
import { useModal } from '@modal'
import {
    handleImageData,
    openCamera,
    uploadBipImage,
} from '@utils/images'
import {
    createBip,
} from '@utils/bips'
import EXIF from 'exif-js'
import Icon from 'react-native-vector-icons/Ionicons'

export default () => {

    const { user } = useApp()
    const {
        addBip,
        addBipImage,
        bips,
        setBipImages,
    } = useBips()
    const { closeModal } = useModal()

    const [ loading, setLoading ] = useState(false)
    const [ previews, setPreviews ] = useState([])
    let uploads = []

    useEffect(() => {
        launchCamera()
    }, [])

    const addPreview = preview => {
        setPreviews([
            preview,
            ...previews,
        ])
    }

    const launchCamera = async () => {
        const uri = await openCamera()
        if (uri) {
            handleSelectedImage(uri)
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
            if (!data) console.log('error loading image')
            else addPreview(data)
        }
        image.src = src
    }

    const uploadBipImages = async (bipId, bipImages) => {
        while (uploads.length < bipImages.length) {
            const imageToUpload = bipImages[uploads.length]
            console.log('uploading image', imageToUpload)
            const uploadedImage = await uploadBipImage(bipId, imageToUpload)
            console.log('uploadedImage/length; pushing to uploads:', uploadedImage, uploads.length)
            uploads.push(uploadedImage)
            console.log('uploads after push', uploads)
            addBipImage({
                bipId,
                image: uploadedImage,
            })
        }
        console.log(`uploading finished... ${uploads.length} image${uploads.length === 1 ? '' : 's'} uploaded.`)
        return uploads
    }

    const submitBip = async () => {
        setLoading(true)
        const bip = await createBip(user._id, user.location)
        if (!bip) console.log('Error adding new bip.')
        else {
            addBip({
                ...bip,
                uploads: previews,
            })
        }
        setLoading(false)
        closeModal()
    }

    const onSubmitImagesForUpload = async () => {
        setLoading(true)
        const bip = await createBip(user._id, user.location)
        
        if (!bip) console.log('Error creating new bip')
        else {
            addBip(bip)
            // const bipImages = 
            
            // uploadBipImages(bip._id, previews)
            // await uploadBipImages(bip._id, previews)

            // setBipImages({
            //     bipId: bip._id,
            //     images: bipImages,
            // })
            setPreviews([])
            uploads = []
            closeModal()
        }
        setLoading(false)
    }

    return (
        <View style={{ flex: 1 }}>

            {previews.length > 0 && (
                <View
                    style={{
                        flex: 1,
                    }}
                >
                    
                    <PreviewList
                        previews={previews.map(p => p.thumbData)}
                    />

                    <View
                        style={{
                            marginVertical: 10,
                            gap: 10,
                        }}
                    >
                        <SimpleButton
                            label='Submit'
                            onPress={submitBip}
                            // onPress={onSubmitImagesForUpload}
                            disabled={loading}
                        />

                        <SimpleButton
                            label='Clear'
                            onPress={() => setPreviews([])}
                            disabled={loading}
                        />
                    </View>
                </View>
            )}

            <View
                style={{
                    flex: 1,
                    paddingVertical: 10,
                    flexDirection: 'row',
                    justifyContent: 'center',
                    alignItems: 'center',
                }}
            >
                <BigRoundButton
                    loading={loading}
                    onPress={launchCamera}
                />
            </View>
            
        </View>
    )
}

const BigRoundButton = ({ loading, onPress }) => (
    <Pressable
        onPress={onPress}
        disabled={loading}
        style={{
            height: 100,
            width: 100,
            borderRadius: 50,
            background: loading ? '#ccc' : 'tomato',
            textAlign: 'center',
            marginHorizontal: 'auto',
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
        }}
    >
        <Icon
            name='camera-sharp'
            size={50}
            color={'#fff'}
            style={{ paddingBottom: 5 }}
        />
    </Pressable>
)