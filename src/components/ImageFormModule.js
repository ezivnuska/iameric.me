import React from 'react'
import {
    View,
} from 'react-native'
import {
    FileSelector,
    IconButton,
    ImageClone,
} from '.'
import EXIF from 'exif-js'
import {
    useUser,
} from '@context'
import { handleImageUpload } from '@utils/images'

export default ({ onImageSelected, removeImage, source = null }) => {

    const { profile, setUserLoading, userLoading } = useUser()

    const dataURItoBlob = async dataURI =>  await (await fetch(dataURI)).blob()
    
    const handleDrop = async uriData => {
        
        const reader = new FileReader()

        reader.onload = ({ target }) => {
            const exif = EXIF.readFromBinaryFile(target.result)
            loadImage(uriData, exif)
        }

        const blob = await dataURItoBlob(uriData)
        reader.readAsArrayBuffer(blob)
    }

    const loadImage = async (src, exif) => {
        const imageLoader = new Image()

        imageLoader.onload = async () => {

            setUserLoading(true)

            const data = await handleImageUpload(profile._id, imageLoader, exif)

            setUserLoading(false)
            
            onImageSelected(data)
        }
        imageLoader.src = src
    }

    const renderControls = () => (
        <View style={{
            flexGrow: 1,
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-evenly',
            height: 50,
        }}>
            
            {(source !== null && typeof source === 'object') && (
                <IconButton
                    type='danger'
                    label='Delete'
                    onPress={removeImage}
                    disabled={userLoading}
                />
            )}

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
            {source && (
                <View style={{ paddingRight: 10 }}>
                    <ImageClone
                        source={source}
                        width={50}
                        height={50}
                        style={{
                            width: 50,
                            height: 50,
                            resizeMode: 'stretch',
                            borderWidth: 1,
                            borderColor: 'pink',
                        }}
                    />
                </View>
            )}
                
            {renderControls()}

        </View>
    )
}