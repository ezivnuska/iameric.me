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
import { AppContext } from '../AppContext'
import axios from 'axios'
import classes from '../styles/classes'

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

    const onSelected = imageId => {
        const selectedItem = items.filter(item => item._id === imageId)[0]

        setFeatured(selectedItem)
    }

    return (
        <View style={{ paddingBottom: 15 }}>
                
            {/* <Header onPress={() => setModalVisible(true)} /> */}

            {loading
                ? <Text style={classes.textDefault}>Loading images...</Text>
                : (
                    <ImageList
                        loading={loading}
                        images={items}
                        username={user.username}
                        onSelected={onSelected}
                    />
                )
            }
            
            <PopUpModal
                visible={featured}
                onRequestClose={() => setFeatured(false)}
            >
                <ImageDetail
                    imageData={featured}
                    closeModal={() => setFeatured(false)}
                />
            </PopUpModal>

        </View>
    )
}