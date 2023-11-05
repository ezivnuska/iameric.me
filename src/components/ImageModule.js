import React, { useContext, useEffect, useState } from 'react'
import {
    Text,
    TouchableOpacity,
    View,
} from 'react-native'
import {
    ImageDetail,
    ImageList,
    ImageUploader,
    ModalContent,
    ImagePreview,
} from '.'
import {
    PlusCircleOutlined,
} from '@ant-design/icons'
import main from '../styles/main'
import layout from '../styles/layout'
import { AppContext } from '../AppContext'
import axios from 'axios'
import { getImagesByUserId } from '../../api/images'
const IMAGE_PATH = __DEV__ ? 'https://www.iameric.me/assets' : '/assets'

const Header = ({ onPress }) => {
    return (
        <View
            style={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'flex-start',
                marginBottom: 15,
            }}
        >
            
            <Text style={main.heading}>Images &amp; Avatar</Text>
            
            <View
                style={{
                    flex: 1,
                    flexGrow: 0,
                    flexShrink: 0,
                    flexBasis: 'auto',
                }}
            >
                <TouchableOpacity
                    style={{
                        marginVertical: 4,
                        marginHorizontal: 7,
                    }}
                    onPress={onPress}
                >
                    <PlusCircleOutlined
                        style={{ fontSize: 22 }}
                    />
                </TouchableOpacity>
            </View>

        </View>
    )
}

export default () => {

    const {
        dispatch,
        user,
    } = useContext(AppContext)

    const [modalVisible, setModalVisible] = useState(false)

    const [featured, setFeatured] = useState(null)
    const [loading, setLoading] = useState(false)
    const [items, setItems] = useState(null)
    const [upload, setUpload] = useState(null)

    useEffect(() => {
        // console.log('setting images', user.images)
        // setItems(user.images)
        getImageData()
    }, [])

    const getImageData = async () => {
        const { data } = await axios.get(`/api/user/images/${user._id}`)
        console.log('images got.', data)
        if (!data) {
            console.log('no images found.')
            return null
        }
        setItems(data.images)
        dispatch({ type: 'SET_USER_IMAGES', images: data.images })
    }

    useEffect(() => {
        console.log('upload value:', upload)
        if (upload) {
            console.log('value confirmed. uploading.')
            uploadImageData(upload)
        }
    }, [upload])

    const uploadImageData = async imageData => {
        
        setLoading('Uploading Image...')

        const { data } = await axios
            .post(`/api/image/upload`, imageData)

        setLoading(null)

        if (!data) {
            console.log('Error uploading image/thumb')
            return null
        }

        console.log('ImageUploader: image/thumb uploaded!', data)
        
        onImageUploaded(data)
        return data
    }

    const onImageUploaded = image => {

        console.log('image uploaded', image)
        
        setUpload(null)

        console.log('image uploaded. current items:', items)
        setItems([...items, image])
        console.log('image uploaded. items set to:', items)
        
        dispatch({ type: 'ADD_IMAGE', image })

        // TODO: PUT THIS IN W NEW IMAGE UPLOADER
        // setUploadedItems([...uploadedItems, filename])

        setModalVisible(false)
    }

    const onDelete = (id, isProfileImage, isProductImage) => {

        setItems(items.filter(item =>
            typeof item === 'string'
            ? item !== id
            : item._id !== id
        ))

        if (isProfileImage) dispatch({ type: 'SET_PROFILE_IMAGE', profileImage: null })
        if (isProductImage) dispatch({ type: 'REMOVE_PRODUCT_IMAGE', imageId: id })
        
        setFeatured(null)
    }

    const deletePreview = async filename => {
        
        const { data } = await axios.post(
            '/api/preview/delete',
            { username: user.username, filename }
        )

        if (!data) console.log('Error deleting preview')

        console.log(`${data.filename} deleted.`)
        
        setUploadedItems([])
    }

    const onImageSelected = payload => {
        console.log('image selected', payload.imageData.filename)
        
        setUpload(payload)
        // const { uri, height, width } = data.imageData
    }

    const onSelected = image => {
        console.log(`selecting image from items:`, items)
        console.log(`selecting ${image} from items:`, items)
        const selectedItem = items.filter(item => {
            console.log('item:', item)
            return item === image._id || item._id === image._id
        })[0]
        // console.log('selected item', selectedItem)
        setFeatured(selectedItem)
    }

    return (
        <View
            style={{
                marginVertical: layout.verticalMargin,
                // borderWidth: 1,
            }}
        >
                
            <Header onPress={() => setModalVisible(true)} />

            {(items && items.length) ? (
                <ImageList
                    images={items}
                    user={user}
                    onSelected={onSelected}
                />
            ) : <Text>No images to display.</Text>}
            
            <ModalContent
                visible={modalVisible}
                onRequestClose={() => setModalVisible(false)}
                label='Upload an Image'
            >
                <ImageUploader
                    onImageSelected={onImageSelected}
                />
            </ModalContent>

            <ModalContent
                visible={featured}
                onRequestClose={() => setFeatured(null)}
                label='Image Detail'
            >
                <ImageDetail
                    imageData={featured}
                    closeModal={() => setFeatured(null)}
                    onDelete={onDelete}
                />
            </ModalContent>
        </View>
    )
}