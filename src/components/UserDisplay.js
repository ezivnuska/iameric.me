import React, { useContext, useEffect, useState } from 'react'
import {
    ActivityIndicator,
    StyleSheet,
    Text,
    View,
} from 'react-native'
import {
    RolePicker,
    UserDetails,
    UserList,
} from './'
import { AppContext } from '../AppContext'

const UserDisplay = ({ users }) => {

    const {
        state,
        dispatch,
    } = useContext(AppContext)

    const { user } = state

    const [ profileId, setProfileId ] = useState(null)
    const [role, setRole] = useState(null)

    useEffect(() => {
        if (user) setRole(user.role)
    }, [user])

    const getUsersByRole = role => users.filter(user => user.role === role)

    const clearUser = () => setProfileId(null)
    const getProfile = () => profileId ? users.filter(usr => usr._id === profileId)[0] : null

    const setUser = id => setProfileId(id)

    return user ? (
        <View style={styles.container}>
            <RolePicker
                value={role}
                onChange={setRole}
            />

            {(users && users.length) ? (
                <View>
                    {profileId ? (
                        <UserDetails
                            user={getProfile()}
                            clearUser={clearUser}
                        />
                    ) : (
                        <UserList
                            users={getUsersByRole(role).filter(usr => user && usr._id !== user._id)}
                            setUser={setUser}
                        />
                    )}
                </View>
            ) : (
                <Text>No users found</Text>
            )}
        </View>
    ) : <ActivityIndicator />
}

export default UserDisplay

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexBasis: 'auto',
        display: 'flex',
        flexDirection: 'column',
        width: '100%',
        // minWidth: 350,
        // maxWidth: 350,
        marginHorizontal: 'auto',
        marginVertical: 10,
    },
})