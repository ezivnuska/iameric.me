import React, { useContext, useEffect, useState } from 'react'
import {
    StyleSheet,
    Text,
    View,
} from 'react-native-web'
import axios from 'axios'
import { UserDetails, UserList } from './'
import { AppContext } from '../AppContext'
// const API_PATH = process.env.API_PATH || '/api'
const API_PATH = '/api'

const UserDisplay = () => {

    const {
        state,
        dispatch,
    } = useContext(AppContext)

    const { user, users } = state

    const [ profileId, setProfileId ] = useState(null)

    const clearUser = () => setProfileId(null)
    const getProfile = () => profileId ? users.filter(usr => usr._id === profileId)[0] : null

    const getUsers = () => axios
        .get(`${API_PATH}/users`)
        .then(({ data }) => dispatch({ type: 'SET_USERS', users: data.users }))
        .catch(err => console.log('Error getting users', err))

    useEffect(() => {
        getUsers()
    }, [])

    const setUser = id => setProfileId(id)

    return (users && users.length) ? (
        <View style={styles.container}>

            {
                profileId
                ? <UserDetails
                    user={getProfile()}
                    clearUser={clearUser}
                />
                : <UserList
                    users={users.filter(usr => user && usr._id !== user._id)}
                    setUser={setUser}
                />
            }
            
        </View>
    ) : null
}

export default UserDisplay

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexBasis: 'auto',
        display: 'flex',
        flexDirection: 'column',
        // justifyContent: 'center',
        width: 375,
        minWidth: 375,
        maxWidth: 400,
        marginHorizontal: 'auto',
    },
})