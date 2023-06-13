import React, { useContext, useEffect, useState } from 'react'
import {
    StyleSheet,
    Text,
    View,
} from 'react-native'
import {
    UserList,
} from './'
import { AppContext } from '../AppContext'
import defaultStyles from '../styles'

const UserDisplay = () => {

    const {
        state,
        dispatch,
    } = useContext(AppContext)

    const { users } = state

    const [ items, setItems ] = useState(null)

    useEffect(() => {
        if (users) setItems(users.filter(user => user.role === 'customer'))
    }, [users])

    return (
        <View style={styles.container}>
            <Text style={defaultStyles.heading}>Customers</Text>
            {items && <UserList users={items} />}
        </View>
    )
}

export default UserDisplay

const styles = StyleSheet.create({
    container: {
        
    },
})