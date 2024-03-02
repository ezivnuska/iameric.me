import React, { useContext, useEffect, useState } from 'react'
import {
    useWindowDimensions,
    View,
} from 'react-native'
import {
    ThemedText,
    LoadingView,
    UserList,
    UserDetailsShort,
} from '.'
import { AppContext } from '../AppContext'
import { loadUsersByRole } from '@utils/data'
import { getOrientation } from '@utils/metrics'

export default () => {
    
    const {
        dispatch,
        isLandscape,
        loading,
        profile,
        users,
        user,
    } = useContext(AppContext)

    const dims = useWindowDimensions()

    const [items, setItems] = useState(null)
    const [userProfile, setUserProfile] = useState(null)

    let interval = undefined
    
    useEffect(() => {
        if (!users) loadUsers()
        else setItems(users)
    
        interval = setInterval(loadUsers, 1000 * (60 * 10))
        return () => unsubscribe()
    }, [])

    const unsubscribe = () => {
        clearInterval(interval)
        interval = undefined
    }

    useEffect(() => {
        if (users && items ) {
            if (users.length !== items.length) setItems(users)
        } else if (users) {
            setItems(users)
        }
    }, [users])

    useEffect(() => {
        if (!profile) setUserProfile(null)
        else if (!userProfile || (userProfile && profile._id !== userProfile._id)) {
            setUserProfile(profile)
        }
    }, [profile])

    const loadUsers = async () => {

        dispatch({ type: 'SET_LOADING', loading: `Loading ${user.role === 'admin' ? 'all users' : user.role}s...`})
        
        const loadedUsers = await loadUsersByRole(user.role)
        
        if (!loadedUsers) {
            console.log('Error loading users')
        } else {
            dispatch({ type: 'SET_USERS', users: loadedUsers.filter(u => u._id !== user._id) })
        }
        
        dispatch({ type: 'SET_LOADING', loading: null })
    }
    
    useEffect(() => {
        if (userProfile) {
            if (!isLandscape) {
                dispatch({ type: 'SET_MODAL', modalName: 'PROFILE' })
            }
        }
    }, [userProfile])

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
                        dispatch({ type: 'SET_PROFILE', profile: item })
                        dispatch({ type: 'SET_MODAL', modalName: 'PROFILE' })
                    }}
                />
            </View>
        )
        : (
            <ThemedText align='left'>
                No users to display.
            </ThemedText>
        )
}