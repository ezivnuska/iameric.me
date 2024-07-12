import React from 'react'
import { View } from 'react-native'
import { FileSelector } from './components'
import {
    SimpleButton,
    ImageClone,
} from '@components'
import EXIF from 'exif-js'
import { useApp } from '@app'
import { handleImageUpload } from '@utils/images'

// USAGE

// const renderImageFormModule = () => {
        
//     const source = attachment
//         ? { uri: attachment.thumbData.uri }
//         : image
//             ? `${IMAGE_PATH}/${profile.username}/thumb/${image.filename}`
//             : null

//     return (
//         <ImageFormModule
//             onImageSelected={att => setFormValues({ attachment: att })}
//             removeImage={removeAttachment}
//             source={source}
//         />
//     )
// }

export default ImageForm = ({ onImageSelected, removeImage, source = null }) => {

    const { user, setAppLoading, appLoading } = useApp()

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

            setAppLoading(true)

            const data = await handleImageUpload(user._id, imageLoader, exif)

            setAppLoading(false)
            
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
                <SimpleButton
                    label='Delete'
                    onPress={removeImage}
                    disabled={appLoading}
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