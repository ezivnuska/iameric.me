import React, { useMemo, useState } from 'react'
import {
    Pressable,
    ScrollView,
    View,
} from 'react-native'
import {
    BipList,
    PreviewList,
} from './components'
import {
    Heading,
    SimpleButton,
} from '@components'
import { useApp } from '@app'
import { useBips } from '@bips'
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
        bips,
        setBipImages,
    } = useBips()

    const [ loading, setLoading ] = useState(false)
    const [ previews, setPreviews ] = useState([])
    let uploads = []

    const numUploads = useMemo(() => uploads.length, [uploads])

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
            const uploadedImage = await uploadBipImage(bipId, imageToUpload)
            uploads.push(uploadedImage)
        }
        console.log(`uploading finished... ${uploads.length} image${uploads.length === 1 ? '' : 's'} uploaded.`)
        return uploads
    }

    const onSubmitImagesForUpload = async () => {
        setLoading(true)
        const bip = await createBip(user._id, user.location)
        
        if (!bip) console.log('Error creating new bip')
        else {
            const bipImages = await uploadBipImages(bip._id, previews)
            addBip(bip)
            setBipImages({
                bipId: bip._id,
                images: bipImages,
            })
            setPreviews([])
            uploads = []
        }
        setLoading(false)
    }

    return (
        <View style={{ flex: 1 }}>

            {previews.length > 0 && (
                <View
                    style={{
                        flexGrow: 0,
                    }}
                >
                    <Heading title={`Captured Images (uploaded: ${numUploads})`} />
                    
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
                            onPress={onSubmitImagesForUpload}
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

            
            <ScrollView
                showsVerticalScrollIndicator={false}
                style={{ flex: 1 }}
                contentContainerStyle={{ flex: 1 }}
            >
                {bips.length > 0 && (
                    <BipList bips={bips} />
                )}
            </ScrollView>

            <View
                style={{
                    flexGrow: 0,
                    paddingVertical: 10,
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
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
            height: 100,
            width: 100,
            borderRadius: 50,
            background: loading ? '#ccc' : 'tomato',
            textAlign: 'center',
            marginHorizontal: 'auto',
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