import React, { useContext, useEffect, useState } from 'react'
import {
    StyleSheet,
    Text,
    View,
} from 'react-native'
import axios from 'axios'
import {
    StatusDisplay,
    UserDetails,
    UserList,
} from './'
import { AppContext } from '../AppContext'

const UserDisplay = () => {

    const {
        state,
        dispatch,
    } = useContext(AppContext)

    const { user, users } = state

    const [ profileId, setProfileId ] = useState(null)
    const [ loading, setLoading ] = useState(false)
    const [status, setStatus] = useState(null)

    const clearUser = () => setProfileId(null)
    const getProfile = () => profileId ? users.filter(usr => usr._id === profileId)[0] : null

    const getUsers = () => axios
        .get('/api/users')
        .then(({ data }) => {
            setLoading(false)
            setStatus('Users loaded.')
            dispatch({ type: 'SET_USERS', users: data.users })
        })
        .catch(err => {
            setStatus('Error loading users.')
            console.log('Error getting users', err)
        })

    useEffect(() => {
        setStatus('Loading users...')
        setLoading(true)
        getUsers()
    }, [])

    useEffect(() => {
        if (loading) {
        }
    }, [users])

    const setUser = id => setProfileId(id)

    return (
        <View style={styles.container}>
            {status ? <StatusDisplay status={status} /> : null}
            {(users && users.length) ? (
                <View>
                    {profileId ? (
                        <UserDetails
                            user={getProfile()}
                            clearUser={clearUser}
                        />
                    ) : (
                        <UserList
                            users={users.filter(usr => user && usr._id !== user._id)}
                            setUser={setUser}
                        />
                    )}
                </View>
            ) : (
                <Text>No users found</Text>
            )}
        </View>
    )
}

export default UserDisplay

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexBasis: 'auto',
        display: 'flex',
        flexDirection: 'column',
        width: 350,
        minWidth: 350,
        maxWidth: 350,
        marginHorizontal: 'auto',
    },
})