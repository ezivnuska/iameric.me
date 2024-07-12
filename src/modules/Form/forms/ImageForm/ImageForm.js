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
                    disabled={formLoading}
                />
            )}

            <ImagePicker />

        </View>
    )

    return (
        <View
            style={{ paddingVertical: 20 }}
        >
            <FormHeader title='Upload Image' />

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

        </View>
    )
}