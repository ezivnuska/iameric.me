import React, { useEffect, useState } from 'react'
import {
    Pressable,
    View,
} from 'react-native'
import { SimpleButton } from '@components'
import { useApp } from '@app'
import { useBips } from '@bips'
import { useModal } from '@modal'
// import { Map } from '@modules'
import {
    handleImageData,
    openCamera,
} from '@utils/images'
import EXIF from 'exif-js'
import Icon from 'react-native-vector-icons/Ionicons'
import BipPreview from './components/BipPreview'

export default () => {

    const { user } = useApp()
    const { addBip } = useBips()
    const { closeModal } = useModal()

    const [ loading, setLoading ] = useState(false)
    const [ uploads, setUploads ] = useState([])

    useEffect(() => {
        launchCamera()
    }, [])

    const addUpload = upload => {
        setUploads([
            ...uploads,
            upload,
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
            else addUpload(data)
        }
        image.src = src
    }

    const clearUploads = () => setUploads([])

    const closeAndClear = () => {
        clearUploads()
        closeModal()
    }
    
    const onBip = async bip => {
        addBip(bip)
        closeAndClear()
    }

    return (
        <View style={{ flex: 1 }}>

            <BipPreview
                images={uploads}
                onBip={onBip}
                onClear={clearUploads}
            />

            {/* <Map /> */}

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

            <SimpleButton
                label='Close'
                onPress={closeAndClear}
            />
            
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