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
} from '.'
import {
    PlusCircleOutlined,
} from '@ant-design/icons'
import main from '../styles/main'
import layout from '../styles/layout'
import { AppContext } from '../AppContext'
import axios from 'axios'

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
    const [items, setItems] = useState()

    useEffect(() => {
        getImageData()
    }, [])

    const getImageData = async () => {
        
        setLoading(true)
        
        const { data } = await axios.get(`/api/user/images/${user._id}`)
        
        if (!data) {
            console.log('no images found.')
            return null
        }
        
        setItems(data.images)

        setLoading(false)
    }

    const uploadImageData = async imageData => {

        setLoading(true)

        const { data } = await axios
            .post(`/api/image/upload`, imageData)

        setLoading(false)

        if (!data) {
            console.log('Error uploading image/thumb')
            return null
        }
        
        onImageUploaded(data)
        
        return data
    }

    const onImageUploaded = image => {
        
        // setUpload(null)
        setItems(items ? [...items, image] : [image])

        setModalVisible(false)
    }

    const onDelete = (id, isProfileImage, isProductImage) => {

        const filteredItems = items.filter(item => item._id !== id)

        setItems(filteredItems)

        if (isProfileImage) dispatch({ type: 'SET_PROFILE_IMAGE', profileImage: null })
        if (isProductImage) dispatch({ type: 'REMOVE_PRODUCT_IMAGE', imageId: id })
        
        setFeatured(null)
    }

    const onSelected = imageId => {
        const selectedItem = items.filter(item => item._id === imageId)[0]

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

            {loading
                ? <Text>Loading...</Text>
                : items
                ? (
                    <ImageList
                        images={items}
                        username={user.username}
                        onSelected={onSelected}
                    />
                )
                : <Text>No images to display.</Text>
            }
            
            <ModalContent
                visible={modalVisible}
                onRequestClose={() => setModalVisible(false)}
                label='Upload an Image'
            >
                <ImageUploader
                    onImageSelected={uploadImageData}
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