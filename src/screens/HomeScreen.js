import React, { useContext, useEffect, useState } from 'react'
import {
    ActivityIndicator,
    StyleSheet,
    View,
} from 'react-native'
import { Screen } from '.'
import {
    UserDisplay,
} from '../components'
import axios from 'axios'
import { AppContext } from '../AppContext'

const HomeScreen = ({ navigation, ...props }) => {

    const {
        dispatch,
        state,
    } = useContext(AppContext)

    const { users } = state

    const [loading, setLoading] = useState(false)
    const [items, setItems] = useState([])

    const getUsers = () => {
        console.log('Loading users...')
        dispatch({ type: 'SET_STATUS', status: 'Loading users...' })
        setLoading(true)

        axios
            .get('/api/users')
            .then(({ data }) => {
                console.log('Users loaded.', data.users)
                setLoading(false)
                dispatch({ type: 'SET_STATUS', status: 'Users loaded.' })
                dispatch({ type: 'SET_USERS', users: data.users })
            })
            .catch(err => {
                dispatch({ type: 'SET_STATUS', status: 'Error loading users.' })
                console.log('Error getting users', err)
            }) 
    }

    useEffect(() => {
        if (!users) getUsers()
    }, [])

    useEffect(() => {
        setItems(users)
    }, [users])

    return (
        <Screen {...props}>
            <View style={styles.container}>
                {items ? <UserDisplay users={items} /> : <ActivityIndicator size='large' />}
            </View>
        </Screen>
    )
}

export default HomeScreen

const styles = StyleSheet.create({
    container: {

    },
})