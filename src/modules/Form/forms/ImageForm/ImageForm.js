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
import { useForm } from '@form'
import { useImages } from '@images'

export default ImageForm = ({ data, removeImage, source = null }) => {

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
                    
                <ImagePicker avatar={data ? data.avatar : false} />

            </View>

        </View>
    )
}