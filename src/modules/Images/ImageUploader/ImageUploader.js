import React from 'react'
import { View } from 'react-native'
import {
    ImageClone,
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
                paddingHorizontal: 10,
            }}
        >

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
                
                <View
                    style={{
                        flex: 1,
                    }}
                >
                    <ImagePicker avatar={data ? data.avatar : false} />
                </View>

            </View>

        </View>
    )
}

export default UserImageUploader