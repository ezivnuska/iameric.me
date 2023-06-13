import React, { useContext, useEffect, useState } from 'react'
import {
    StyleSheet,
    Text,
    View,
} from 'react-native'
import {
    UserList,
} from '.'
import { AppContext } from '../AppContext'
import defaultStyles from '../styles'

const DriverDisplay = () => {
    
    const {
        dispatch,
        state,
    } = useContext(AppContext)

    const { users } = state
    
    const [items, setItems] = useState(null)

    useEffect(() => {
        if (users) setItems(users.filter(user => user.role === 'driver'))
    }, [users])

    return (
        <View style={styles.container}>
            <Text style={defaultStyles.heading}>Drivers</Text>
            {items && <UserList users={items} />}
        </View>
    )
}

export default DriverDisplay

const styles = StyleSheet.create({
    container: {

    },
})