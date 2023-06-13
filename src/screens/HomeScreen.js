import React, { useContext, useEffect, useState } from 'react'
import {
    ActivityIndicator,
    StyleSheet,
    View,
} from 'react-native'
import { Screen } from '.'
import {
    DriverDisplay,
    EntryDisplay,
    MerchantDisplay,
    Module,
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
                console.log('Users loaded.')
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
        getUsers()
    }, [])

    // useEffect(() => {
    //     if (users) setItems(users)
    // }, [users])

    return (
        <Screen {...props}>
            {users ? (
                <View style={styles.container}>
                    <View style={styles.modules}>
                        <Module>
                            <DriverDisplay />
                        </Module>
                        <Module>
                            <MerchantDisplay />
                        </Module>
                        <Module>
                            <UserDisplay />
                        </Module>
                    </View>
                    <Module>
                        <EntryDisplay />
                    </Module>
                </View>
            ) : <ActivityIndicator size='large' />}
        </Screen>
    )
}

export default HomeScreen

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'flex-start',
        flexWrap: 'wrap',
    },
    modules: {
        flex: 1,
        flexShrink: 1,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'flex-start',
        flexWrap: 'wrap',
        width: 550,
        minWidth: '70%',
        maxWidth: 900,
    },
})