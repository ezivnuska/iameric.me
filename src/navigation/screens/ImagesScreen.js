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
        images,
        loading,
        user,
    } = useContext(AppContext)

    const [items, setItems] = useState(null)

    useEffect(() => {
        if (!user) console.log('user not loaded')
        else if (!images) loadImages()
    }, [user])

    useEffect(() => {
        if (images) setItems(images)
    }, [images])

    const loadImages = async () => {
        
        dispatch({ type: 'SET_LOADING', loading: 'Fetching images...' })
        
        const { data } = await axios.get(`/api/user/images/${user._id}`)
        
        if (!data) {
            console.log('Error fetching user images.')
        } else if (!data.images || !data.images.length) {
            console.log('no images found.')
            setItems(null)
        } else {
            setItems(data.images)
            dispatch({ type: 'SET_IMAGES', images: data.images })
        }
        
        dispatch({ type: 'SET_LOADING', loading: null })
    }

    return (
        <Screen
            titleComponent={<ScreenTitle title='Images' />}
        >
            <View style={{ paddingHorizontal: 10 }}>
                {loading
                    ? <LoadingView loading={loading} />
                    : (
                        <ImageList
                            images={items}
                            username={user.username}
                            onSelected={image => {
                                dispatch({ type: 'SET_IMAGE', image })
                                // dispatch({ type: 'SET_MODAL', modalName: 'IMAGE' })
                            }}
                            // uploadImage={() => console.log('uplading image...')}
                        />
                    )
                }
            </View>
        </Screen>
    )
}