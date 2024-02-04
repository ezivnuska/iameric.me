import React, { useContext, useEffect, useState } from 'react'
import {
    View,
} from 'react-native'
import {
    DefaultText,
    ImageDetail,
    ImageList,
    LoadingView,
    PopUpModal,
} from '.'
import axios from 'axios'

export default ({ user }) => {

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

            {loading
                ? <LoadingView label='Loading images...' />
                : items && items.length
                    ? (
                        <ImageList
                            loading={loading}
                            images={items}
                            username={user.username}
                            onSelected={onSelected}
                        />
                    )
                    : <DefaultText>No entries yet.</DefaultText>
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