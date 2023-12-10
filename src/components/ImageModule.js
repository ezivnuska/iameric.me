import React, { useContext, useEffect, useState } from 'react'
import {
    Text,
    View,
} from 'react-native'
import {
    ImageDetail,
    ImageList,
    ImageSelector,
    PopUpModal,
} from '.'
import {
    PlusOutlined,
} from '@ant-design/icons'
import { Button } from 'antd'
import { AppContext } from '../AppContext'
import axios from 'axios'

const Header = ({ onPress }) => {
    return (
        <View
            style={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'flex-start',
                alignItems: 'center',
                marginBottom: 10,
            }}
        >
            
            <Text
                style={{
                    flex: 1,
                    flexGrow: 0,
                    flexBasis: 'auto',
                    fontSize: 24,
                    fontWeight: 700,
                    lineHeight: 32,
                }}
            >
                Images
            </Text>

            <View
                style={{
                    flex: 1,
                    flexGrow: 0,
                    flexShrink: 1,
                    flexBasis: 'auto',
                    paddingHorizontal: 10,
                }}
            >
                <Button
                    size='small'
                    shape='circle'
                    icon={<PlusOutlined />}
                    onClick={onPress}
                />
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
        if (!imageData) {
            setModalVisible(false)
            return null
        }

        console.log('uploading image', imageData)

        setLoading(true)

        const { data } = await axios
            .post(`/api/image/upload`, imageData)

        setLoading(false)

        if (!data) {
            console.log('Error uploading image/thumb')
            return null
        }
        
        setItems(items ? [...items, data] : [data])

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
        <View style={{ paddingBottom: 15 }}>
                
            <Header onPress={() => setModalVisible(true)} />

            {loading
                ? <Text>Loading...</Text>
                : (items && items.length)
                    ? (
                        <ImageList
                            images={items}
                            username={user.username}
                            onSelected={onSelected}
                        />
                    )
                    : <Text>No images to display.</Text>
            }
            
            <PopUpModal
                visible={modalVisible}
                onRequestClose={() => setModalVisible(false)}
            >
                <ImageSelector
                    onSelected={uploadImageData}
                />
            </PopUpModal>
            
            <PopUpModal
                visible={featured}
                onRequestClose={() => setFeatured(false)}
            >
                <ImageDetail
                    imageData={featured}
                    closeModal={() => setFeatured(false)}
                    onDelete={onDelete}
                />
            </PopUpModal>

        </View>
    )
}