import React, { useContext, useEffect, useState } from 'react'
import {
    StyleSheet,
    Text,
    View,
} from 'react-native'
import { UserList } from '.'
import { AppContext } from '../AppContext'
import defaultStyles from '../styles'

const MerchantDisplay = () => {
    
    const {
        dispatch,
        state,
    } = useContext(AppContext)

    const { users } = state
    
    const [items, setItems] = useState(null)

    useEffect(() => {
        if (users) setItems(users.filter(user => user.role === 'merchant'))
    }, [users])

    return (
        <View style={styles.container}>
            <Text style={defaultStyles.heading}>Merchants</Text>
            {items && <UserList users={items} />}
        </View>
    )
}

export default MerchantDisplay

const styles = StyleSheet.create({
    container: {
        
    },
})