import React, { useContext, useEffect, useState } from 'react'
import {
    View,
} from 'react-native'
import {
    EmptyStatus,
    ImageList,
    LoadingView,
} from '@components'
import {
    Screen,
    ScreenTitle,
} from '.'
import { AppContext } from '../../AppContext'
import { loadFullUser } from '@utils/data'

export default ({ navigation, route }) => {
    
    const {
        dispatch,
        loading,
    } = useContext(AppContext)

    const { id } = route.params
    const [currentUser, setCurrentUser] = useState(null)

    useEffect(() => {
        init()
    }, [])

    const init = async () => {
        const result = await loadFullUser(dispatch, id)
        setCurrentUser(result)
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
            {currentUser.images ? (
                <View
                    style={{ marginHorizontal: 10 }}
                >
                    <ImageList
                        images={currentUser.images}
                        // username={currentUser.username}
                        onSelected={image => {
                            dispatch({ type: 'SET_MODAL', modalType: 'IMAGE', data: { id: image._id } })
                        }}
                    />
                </View>
            ) : <EmptyStatus status='No images yet.' />}
            
        </Screen>
    ) : null
}