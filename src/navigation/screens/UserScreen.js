import React, { useContext, useEffect, useState } from 'react'
import {
    View,
} from 'react-native'
import {
    ImageList,
    LoadingView,
} from '@components'
import {
    Screen,
    ScreenTitle,
} from '.'
import { AppContext } from '../../AppContext'
import { loadUserById } from '@utils/data'
import axios from 'axios'
import { StackActions } from '@react-navigation/native'
import { loadImages } from '@utils/images'
import { loadUser, loadUsers } from '@utils/data'
// import { navigationRef } from '../RootNavigation'

export default ({ navigation, route }) => {
    
    const {
        dispatch,
        getUserById,
        loading,
        users,
    } = useContext(AppContext)

    const { id } = route.params
    const [currentUser, setCurrentUser] = useState(null)

    useEffect(() => {
        console.log('UserScreen initialized')
        init()
    }, [])

    const init = async () => {
        let result = await loadUser(dispatch, id)
        console.log('result-->', result)
        const images = await loadImages(dispatch, result._id)
        result = {
            ...result,
            images,
        }
        console.log('result-->-->', result)
        setCurrentUser(result)
    }

    // useEffect(() => {
    //     // if (!currentUser || currentUser._id !== id) {
    //     //     setCurrentUser(getUserById(id))
    //     // } else {
    //         if (currentUser) {
    //             console.log('currentUser', currentUser)
    //             // console.log('currentUser.images', currentUser.images)
    //             if (!currentUser.images) {
    //                 console.log('loading images')
    //                 loadImages(dispatch, currentUser._id)
    //             }
    //         }
    //     // }
    // }, [currentUser])

    // useEffect(() => {
    //     console.log('users changed', users)
    //     if (users && getUserById(id)) {
    //         checkImages()
    //     }
    // }, [users])

    // const checkImages = async () => {
    //     await loadImages(dispatch, getUserById(id)._id)
    //     let u = getUserById(id)
    //     setCurrentUser(u)
    // }

    // useEffect(() => {
    //     console.log('id changed', id)
    //     setCurrentUser(getUserById(id))
    // }, [id])

    //     // return () => {
    //     //     StackActions.replace('UserList')
    //     //     // navigationRef?.resetRoot({
    //     //     //     index: 0,
    //     //     //     routes: [{ name: 'UserList' }]
    //     //     // })
    //     // }
    // }, [])

    // useEffect(() => {
    //     console.log('currentUser', currentUser)
    //     // if (!user || id !== user._id) {
    //     //     console.log('loading on user change; new id:', id)
    //     //     loadUserDetails(id)
    //     // }
    //     // loadImages()
    // }, [currentUser])

    // const getCurrentUser = () => {
    //     console.log('currentUSER', currentUser)
    //     return currentUser
    // }

    // const loadUserDetails = async userId => {

    //     dispatch({ type: 'SET_LOADING', loading: 'Loading user...' })
        
    //     const loadedUser = await loadUserById(userId)
        
    //     if (!loadedUser) {
    //         console.log('could not load user details with id:', userId)
    //     } else {
    //         dispatch({ type: 'UPDATE_USER', user: loadedUser })
    //         if (user && user.images) {
    //             setUser({
    //                 images: user.images,
    //                 ...loadedUser,
    //             })
    //         } else {
    //             setUser(loadedUser)
    //         }
    //     }
        
    //     dispatch({ type: 'SET_LOADING', loading: null })
    // }

    // const loadImages = async () => {
        
    //     dispatch({ type: 'SET_LOADING', loading: 'Fetching images...' })
        
    //     const { data } = await axios.get(`/api/user/images/${id}`)
        
    //     if (!data) {
    //         console.log('Error fetching user images.')
    //     } else if (!data.images || !data.images.length) {
    //         console.log('no images found.')
    //         // dispatch({ type: 'UPDATE_USER_IMAGES', userId: user._id, images: [] })
    //     } else {
    //         dispatch({ type: 'UPDATE_USER_IMAGES', userId: id, images: data.images })
    //         console.log('images loaded', data.images)
    //         setUser({
    //             ...user,
    //             images: data.images,
    //         })
    //     }
    //     console.log('images!!', data)
    //     dispatch({ type: 'SET_LOADING', loading: null })
    // }

    if (loading) return  <LoadingView />

    return currentUser ? (
        <Screen
            titleComponent={
                <ScreenTitle
                    backLabel='Users'
                    title={currentUser ? currentUser.username : 'User' }
                    navigation={navigation}
                />
            }
        >
            <View
                style={{ marginHorizontal: 10 }}
            >
                <ImageList
                    images={currentUser.images}
                    username={currentUser.username}
                    onSelected={image => {
                        dispatch({ type: 'SET_IMAGE', image })
                    }}
                />
            </View>
            
        </Screen>
    ) : null
}