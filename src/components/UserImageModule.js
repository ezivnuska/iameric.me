import React, { useContext, useEffect, useState } from 'react'
import {
    View,
} from 'react-native'
import {
    ThemedText,
    ImageList,
    LoadingView,
} from '.'
import axios from 'axios'
import { AppContext } from '../AppContext'

export default ({ user }) => {

    const {
        dispatch,
        loading,
    } = useContext(AppContext)

    const [items, setItems] = useState(null)

    useEffect(() => {
        if (user) getImageData()
    }, [])

    useEffect(() => {
        if (user && !loading && !items) getImageData()
    }, [user])

    const getImageData = async () => {
        
        dispatch({ type: 'SET_LOADING', loading: 'Fetching image...' })
        
        const { data } = await axios.get(`/api/user/images/${user._id}`)
        
        if (!data) {
            console.log('no images found.')
            return null
        }
        
        setItems(data.images)

        dispatch({ type: 'SET_LOADING', loading: null })
    }

    const onSelected = imageId => {
        const selectedItem = items.filter(item => item._id === imageId)[0]

        dispatch({ type: 'SET_FEATURED', featured: selectedItem })
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
                    : <ThemedText>No entries yet.</ThemedText>
            }

        </View>
    )
}