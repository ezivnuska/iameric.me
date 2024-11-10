import React from 'react'
import { View } from 'react-native'
import {
    ImageClone,
    ModalHeader,
    SimpleButton,
} from '@components'
import {
    ImagePicker,
} from './components'
import { useForm } from '@form'
import { useImages } from '../ImagesContext'

const UserImageUploader = ({ data, removeImage, source = null }) => {

    const { formLoading } = useForm()
    const {
        uploading,
        closeImagesModal,
    } = useImages()

    return (
        <View
            style={{
                flex: 1,
                backgroundColor: '#fff',
                paddingHorizontal: 10,
            }}
        >

            <ModalHeader 
                title={`Upload${uploading ? 'ing' : ''} Image`}
                onClose={closeImagesModal}
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

export default UserImageUploader