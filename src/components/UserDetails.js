import React, { useContext, useEffect, useState } from 'react'
import {
    Image,
} from 'react-native'
import {
    IconButton,
    ImageList,
    LoadingView,
} from '@components'
import { AppContext } from '../AppContext'
import { loadUserById } from '@utils/data'
import axios from 'axios'
import { useTheme } from 'react-native-paper'

const IMAGE_PATH = __DEV__ ? 'https://iameric.me/assets' : '/assets'

export default ({ userId }) => {

    const theme = useTheme()

    const {
        dispatch,
        loading,
    } = useContext(AppContext)

    const [userDetails, setUserDetails] = useState(null)
    const [images, setImages] = useState(null)

    useEffect(() => {
        if (!userId) console.log('missing required user id param')
        else loadUserDetails(userId)
    }, [])

    useEffect(() => {
        if (userId && userDetails && userId !== userDetails._id)
            loadUserDetails(userId)
    }, [userId])

    useEffect(() => {
        if (!userDetails) {
            setImages(null)
        } else {
            if (userDetails._id !== userId) {
                loadUserDetails(userId)
            } else if (!images) {
                loadImages()
            }
        }
    }, [userDetails])

    const loadUserDetails = async () => {

        dispatch({ type: 'SET_LOADING', loading: 'Loading user...' })
        
        const user = await loadUserById(userId)
        
        if (!user) {
            console.log('could not load user details with id:', userId)
        } else {
            setUserDetails(user)
        }
        
        dispatch({ type: 'SET_LOADING', loading: null })
    }

    const loadImages = async () => {
        
        dispatch({ type: 'SET_LOADING', loading: 'Fetching images...' })
        
        const { data } = await axios.get(`/api/user/images/${userId}`)
        
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

    // TODO: clean this.
    const renderUserAvatar = () => {

        const { profileImage, username } = userDetails

        const filename = (profileImage && profileImage.filename)
            ? profileImage.filename
            : null
        
        const source = filename ?
            `${IMAGE_PATH}/${username}/${filename}` :
            `${IMAGE_PATH}/avatar-default.png`
        
        return (
            <Image
                source={source}
                style={{
                    width: profileImage ? profileImage.width : 250,
                    height: profileImage ? profileImage.width : 250,
                    resizeMode: 'cover',
                    marginVertical: 15,
                }}
            />
        )
    }

    return loading
        ? <LoadingView label={loading} />
        : userDetails
            ? (
                <>
                    {renderUserAvatar()}

                    <ImageList
                        images={images}
                        username={userDetails.username}
                        onSelected={image => dispatch({ type: 'SET_IMAGE', image })}
                    />
                    {/* <UserImageModule user={userDetails} /> */}
                </>
            )
            : null
}