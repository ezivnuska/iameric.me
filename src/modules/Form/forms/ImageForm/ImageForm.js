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

    return (
        <View
            // style={{
            //     borderWidth: 1,
            //     borderColor: 'red',
            // }}
        >
            <FormHeader title='Upload Image' />

            <View
                style={{
                    flexDirection: 'row',
                    flexWrap: 'wrap',
                    // borderWidth: 1,
                    // borderColor: 'green',
                }}
            >
                {source && (
                    <>
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