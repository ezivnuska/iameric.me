import React, { useContext, useEffect, useState } from 'react'
import {
    View,
} from 'react-native'
import {
    ThemedText,
    ImageDetail,
    ImageList,
    ImageSelector,
    PopUpModal,
} from '.'
import { AppContext } from '../AppContext'
import axios from 'axios'

export default ({ user }) => {

    const {
        dispatch,
    } = useContext(AppContext)

    const [modalVisible, setModalVisible] = useState(false)

    const [featured, setFeatured] = useState(null)
    const [loading, setLoading] = useState(false)
    const [items, setItems] = useState(null)

    useEffect(() => {
        if (user) getImageData()
    }, [])

    useEffect(() => {
        if (user && !loading && !items) getImageData()
    }, [user])

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

        // console.log('uploading image', imageData)

        setLoading('Uploading image...')

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

        setLoading('Deleting image...')

        const filteredItems = items.filter(item => item._id !== id)

        setItems(filteredItems)

        if (isProfileImage) dispatch({ type: 'SET_PROFILE_IMAGE', profileImage: null })
        if (isProductImage) dispatch({ type: 'REMOVE_PRODUCT_IMAGE', imageId: id })

        setFeatured(null)
        
        setLoading(null)
    }

    const onSelected = imageId => {
        const selectedItem = items.filter(item => item._id === imageId)[0]

        setFeatured(selectedItem)
    }

    return (
        <View style={{ paddingBottom: 15 }}>
                
            {/* <Header onPress={() => setModalVisible(true)} /> */}

            {loading
                ? <ThemedText>Loading images...</ThemedText>
                : (
                    <ImageList
                        loading={loading}
                        images={items}
                        username={user.username}
                        onSelected={onSelected}
                        onAddImage={() => setModalVisible(true)}
                    />
                )
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
                transparent={false}
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