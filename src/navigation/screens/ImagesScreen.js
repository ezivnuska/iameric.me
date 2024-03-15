import React, { useContext, useEffect } from 'react'
import {
    ImageList,
    LoadingView,
} from '@components'
import {
    Screen,
    ScreenTitle,
} from '.'
import {
    View,
} from 'react-native'
import { AppContext } from '../../AppContext'
import { loadImages } from '@utils/images'

export default () => {

    const {
        dispatch,
        loading,
        user,
    } = useContext(AppContext)

    // useEffect(() => {
    //     console.log('hello')
    //     console.log('user', user)
    //     if (!user) console.log('user not loaded')
    // }, [])

    useEffect(() => {
        init()
    }, [])

    const init = async () => {
        console.log('loading images for root user')
        loadImages(dispatch, user._id)
    }

    if (loading) return <LoadingView />

    return (
        <Screen
            titleComponent={<ScreenTitle title='Images' />}
        >
            <View style={{ paddingHorizontal: 10 }}>
                <ImageList
                    images={user.images}
                    username={user.username}
                    onSelected={image => {
                        dispatch({ type: 'SET_IMAGE', image })
                        // dispatch({ type: 'SET_MODAL', modalName: 'IMAGE' })
                    }}
                    // uploadImage={() => console.log('uplading image...')}
                />
            </View>
        </Screen>
    )
}