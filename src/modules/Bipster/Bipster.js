import React, { useState } from 'react'
import {
    Image,
    Platform,
    Pressable,
    View,
} from 'react-native'
import { ImageList } from './components'
import {
    Heading,
    SimpleButton,
} from '@components'
import {
    launchCameraAsync,
    requestCameraPermissionsAsync,
} from 'expo-image-picker'
import Icon from 'react-native-vector-icons/Ionicons'

export default () => {

    const [ images, setImages ] = useState([])
    const [ loading, setLoading ] = useState(false)

    const addImage = image => {
        setImages([image, ...images])
    }

    const openCamera = async () => {

        setLoading(true)

        if (Platform.OS === 'desktop') {
            alert('Camera is not available on this platform.')
            console.log('Camera is not available on this platform.')
            setLoading(false)
            return
        } else {
            const { status } = await requestCameraPermissionsAsync()
            
            if (status !== 'granted') {
                alert('Permission to access camera is required!')
                console.log('Permission to access camera is required!')
            } else {

                try {
        
                    const result = await launchCameraAsync({
                        allowsEditing: true,
                        aspect: [4, 3],
                        quality: 1,
                    })
                
                    if (!result.canceled) {
                        addImage(result.assets[0].uri)
                    }
                } catch (error) {
                    alert('Error accessing the camera', error.message)
                }
            }
            setLoading(false)
            
        }

        
        setLoading(false)
    }

    return (
        <View style={{ flex: 1 }}>
            <Heading title='Bipster' />

            <View
                style={{
                    flex: 1,
                    gap: 50,
                }}
            >
                <View style={{ flexGrow: 0 }}>
                    <BigRoundButton
                        loading={loading}
                        onPress={openCamera}
                    />
                </View>

                
                <View
                    style={{
                        flexGrow: 0,
                        flexDirection: 'row',
                        justifyContent: 'flexStart',
                        flexWrap: 'wrap',
                        gap: 2,
                    }}
                >
                    <ImageList
                        images={images}
                        loading={loading}
                    />

                </View>

                {images.length > 0 && (
                    <SimpleButton
                        label='Submit'
                        onPress={() => setImages([])}
                    />
                )}

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