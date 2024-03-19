import React, { useContext, useEffect, useState } from 'react'
import {
    useWindowDimensions,
    View,
} from 'react-native'
import {
    LoadingView,
    UserList,
    EmptyStatus,
} from '.'
import { AppContext } from '../AppContext'
import {
    loadUsers,
    loadUsersByRole,
} from '@utils/data'
import { getOrientation } from '@utils/metrics'
import { navigationRef } from 'src/navigation/RootNavigation'

export default () => {
    
    const {
        dispatch,
        isLandscape,
        loading,
        users,
        usersLoaded,
    } = useContext(AppContext)
    
    useEffect(() => {
        if (!users || !usersLoaded) loadUsers(dispatch)
    }, [])

    if (loading) return <LoadingView />

    return users && users.length
        ? (
            <View
                style={{
                    flex: 1,
                    flexGrow: 1,
                }}
            >
                <UserList
                    horizontal={isLandscape}
                    items={users}
                    onPress={item => {
                        navigationRef.navigate('User', { id: item._id })
                    }}
                />
            </View>
        )
        : <EmptyStatus status='No users to display.' />
}