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
        loading,
        profile,
        users,
        user,
    } = useContext(AppContext)

    const dims = useWindowDimensions()

    const [userProfile, setUserProfile] = useState(null)
    const [isPortrait, setIsPortrait] = useState(true)

    let interval = undefined

    const unsubscribe = () => {
        clearInterval(interval)
        interval = undefined
    }

    useEffect(() => {
        if (!profile) setUserProfile(null)
        else if (!userProfile || (userProfile && profile._id !== userProfile._id)) {
            setUserProfile(profile)
        }
    }, [profile])

    useEffect(() => {
        const portrait = getOrientation(dims) === 'portrait'
        if (!isPortrait || isPortrait !== portrait) setIsPortrait(portrait)
    }, [dims])

    useEffect(() => {
        if (!users) loadUsers()
        interval = setInterval(loadUsers, 1000 * (60 * 10))
        return () => unsubscribe()
    }, [])

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

    const showProfile = userData => {
        setUserProfile(userData)
        dispatch({ type: 'SET_PROFILE', profile: userData })
    }
    
    useEffect(() => {
        if (userProfile) {
            if (getOrientation(dims) === 'portrait') {
                dispatch({ type: 'SET_MODAL', modalName: 'PROFILE' })
            }
        }
    }, [userProfile])

    return (
        <View
            style={{
                flexDirection: 'row',
                justifyContent: 'space-evenly',
                alignItems: 'flex-start',
            }}
        >
            <View style={{ flex: 1 }}>
                {loading
                    ? <LoadingView label={loading} />
                    : users && users.length
                        ? (
                            <UserList
                                users={users}
                                onPress={item => showProfile(item)}
                            />
                        )
                        : <ThemedText>No users to display.</ThemedText>
                }
            </View>

            {!isPortrait && (
                <View style={{ flex: 1 }}>
                    {userProfile && (
                        <UserDetailsShort
                            userId={userProfile._id}
                            clear={() => dispatch({ type: 'SET_PROFILE', profile: null })}
                        />
                    )}
                </View>
            )}
        
        </View>
    )
}