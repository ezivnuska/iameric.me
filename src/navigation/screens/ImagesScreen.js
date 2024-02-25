import React, { useContext, useEffect, useState } from 'react'
import {
    ImageList,
    LoadingView,
    ThemedText,
} from '@components'
import {
    Screen,
    ScreenTitle,
} from '.'
import {
    View,
} from 'react-native'
import axios from 'axios'
import { AppContext } from '../../AppContext'

export default () => {

    const {
        dispatch,
        loading,
        user,
    } = useContext(AppContext)

    const [images, setImages] = useState(null)

    useEffect(() => {
        if (!user) console.log('user not loaded')
        else if (!images) loadImages()
    }, [user])

    const loadImages = async () => {
        
        dispatch({ type: 'SET_LOADING', loading: 'Fetching images...' })
        
        const { data } = await axios.get(`/api/user/images/${user._id}`)
        
        if (!data) {
            console.log('Error fetching user images.')
        } else if (!data.images || !data.images.length) {
            console.log('no images found.')
            setImages([])
        } else {
            setImages(data.images)
        }
        
        dispatch({ type: 'SET_LOADING', loading: null })
    }

    return (
        <Screen>
            <ScreenTitle title='Images' />
            
            <View style={{ paddingHorizontal: 10 }}>
                {loading
                    ? <LoadingView loading={loading} />
                    : images && images.length
                    ? (
                        <ImageList
                            images={images}
                            username={user.username}
                            onSelected={image => dispatch({ type: 'SET_IMAGE', image })}
                        />
                    )
                    : <ThemedText>No images to display.</ThemedText>
                }
            </View>
        </Screen>
    )
}