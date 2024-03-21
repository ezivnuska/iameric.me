import React, { useContext, useEffect, useMemo } from 'react'
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
        modal,
        user,
    } = useContext(AppContext)

    // const userImages = useMemo(() => [user.images], [user])

    useEffect(() => {
        if (user) {
            if (!user.images) {
                loadImages(dispatch, user._id)
            }
        }
    }, [user])

    if (loading) return <LoadingView />

    return (
        <Screen
            titleComponent={<ScreenTitle title='Images' />}
        >
            {user && user.images && (
                <View style={{ paddingHorizontal: 10 }}>
                    <ImageList
                        images={user.images}
                        // username={user.username}
                        onSelected={image => {
                            console.log('selected image', image)
                            dispatch({ type: 'SET_MODAL', modalType: 'IMAGE', data: { id: image._id } })
                        }}
                    />
                </View>
            )}
        </Screen>
    )
}