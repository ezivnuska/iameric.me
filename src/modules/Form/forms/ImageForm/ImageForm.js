import React from 'react'
import { View } from 'react-native'
import { FormHeader } from '../components'
import {
    SimpleButton,
    ImageClone,
} from '@components'
import {
    ImagePicker,
} from './components'
import EXIF from 'exif-js'
import { useApp } from '@app'
import { useForm } from '@form'
import { useImages } from '@images'

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

export default ImageForm = ({ removeImage, source = null }) => {

    const { formLoading } = useForm()
    const { uploading } = useImages()

    return (
        <View>

            <FormHeader 
                title={`Upload${uploading ? 'ing' : ''} Image`}
                closeable={!uploading}
            />

            <View
                style={{
                    flexDirection: 'row',
                    flexWrap: 'wrap',
                }}
            >
                {source && (
                    <>
                        <ImageClone
                            source={source}
                            width={200}
                            height='auto'
                            style={{
                                width: 200,
                                height: 'auto',
                                // resizeMode: 'stretch',
                            }}
                        />

                        <SimpleButton
                            label='Delete'
                            onPress={removeImage}
                            disabled={formLoading}
                        />
                    </>
                )}
                    
                <ImagePicker />

            </View>

        </View>
    )
}