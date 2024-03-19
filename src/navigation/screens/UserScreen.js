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
import { loadImages } from '@utils/images'
import { loadUser } from '@utils/data'

export default ({ navigation, route }) => {
    
    const {
        dispatch,
        loading,
    } = useContext(AppContext)

    const { id } = route.params
    const [currentUser, setCurrentUser] = useState(null)

    useEffect(() => {
        console.log('initializing UserScreen...')
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
        setCurrentUser(result)
        console.log('UserScreen initialized.')
        console.log('setCurrentUser =>', result)
    }

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
                        dispatch({ type: 'SET_MODAL', modalType: 'IMAGE', id: image._id })
                    }}
                />
            </View>
            
        </Screen>
    ) : null
}