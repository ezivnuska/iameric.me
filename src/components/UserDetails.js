import React, { useContext, useEffect, useState } from 'react'
import {
    Image,
    useWindowDimensions,
} from 'react-native'
import {
    LoadingView,
} from '@components'
import { AppContext } from '@context'
import { loadUserById } from '@utils/data'
import axios from 'axios'

const IMAGE_PATH = __DEV__ ? 'https://iameric.me/assets' : '/assets'
const MAX_IMAGE_HEIGHT = 120

export default ({ userId }) => {

    const dims = useWindowDimensions()

    const {
        dispatch,
        loading,
        user,
    } = useContext(AppContext)

    // const [userDetails, setUserDetails] = useState(null)
    // const [images, setImages] = useState(null)

    // useEffect(() => {
    //     if (!userId) console.log('missing required user id param')
    //     else loadUserDetails(userId)
    // }, [])

    // useEffect(() => {
    //     if (userId && userDetails && userId !== userDetails._id)
    //         loadUserDetails(userId)
    // }, [userId])

    // useEffect(() => {
    //     if (!userDetails) {
    //         setImages(null)
    //     } else {
    //         if (userDetails._id !== userId) {
    //             loadUserDetails(userId)
    //         } else if (!images) {
    //             loadImages()
    //         }
    //     }
    // }, [userDetails])

    // const loadUserDetails = async () => {

    //     dispatch({ type: 'SET_LOADING', loading: 'Loading user details...' })
        
    //     const user = await loadUserById(userId)
        
    //     if (!user) {
    //         console.log('could not load user details with id:', userId)
    //     } else {
    //         setUserDetails(user)
    //     }
        
    //     dispatch({ type: 'SET_LOADING', loading: null })
    // }

    // const loadImages = async () => {
        
    //     dispatch({ type: 'SET_LOADING', loading: 'Fetching images...' })
        
    //     const { data } = await axios.get(`/api/user/images/${userId}`)
        
    //     if (!data) {
    //         console.log('Error fetching user images.')
    //     }
        
    //     dispatch({ type: 'SET_LOADING', loading: null })
    // }

    const getImageDims = (w, h) => {
        let scale = 1
        let width = w
        let height = h
        if (w >= h) {// if landscape
            if (w > dims.width - 20) {
                scale = (dims.width - 20) / width
                width *= scale
                height *= scale
            }
        }
        if (h > MAX_IMAGE_HEIGHT) {
            scale = MAX_IMAGE_HEIGHT / height
            width *= scale
            height *= scale
        }

        return { width, height }
    }

    // TODO: clean this.
    const renderUserAvatar = userDetails => {

        const { profileImage, username } = userDetails

        const filename = (profileImage && profileImage.filename)
            ? profileImage.filename
            : null
        
        const source = filename ?
            `${IMAGE_PATH}/${username}/${filename}` :
            `${IMAGE_PATH}/avatar-default.png`

        const { width, height } = profileImage
            ? getImageDims(profileImage.width, profileImage.height)
            : { width: 200, height: 200 }
        
        return (
            <Image
                source={source}
                style={{
                    width,
                    height,
                    resizeMode: 'cover',
                }}
            />
        )
    }

    return loading
        ? <LoadingView />
        : user
            ? renderUserAvatar(user)
            : null
}