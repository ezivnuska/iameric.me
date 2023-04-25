import React, { useContext, useEffect } from 'react'
import {
    StyleSheet,
    Text,
    TouchableOpacity,
} from 'react-native'
import axios from 'axios'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { AppContext } from '../AppContext'
import { CloseCircleOutlined } from '@ant-design/icons'
import { navigate } from '../navigators/RootNavigation'
const Disconnect = props => {

    const {
        state,
        dispatch,
    } = useContext(AppContext)

    // const { user } = state

    // useEffect(() => {
    //     console.log('USER_CHANGE', user)
    //     if (!user) 
    // }, user)

    const signout = () => {
        const { user } = state
        axios
            .post('/api/signout', { _id: user._id })
            .then(({ data }) => {
                if (!data.success) throw new Error('Error signing out')
                
                AsyncStorage
                    .multiRemove(['route', 'userToken'], err => {
                        if (err) console.log('Error cleaning local storage', err)
                    })
                    .then(() => {
                        console.log(`${user.username} signed out`)
                        dispatch({ type: 'SIGNOUT' })
                        navigate('auth')
                    })
                    .catch(err => console.log('Error cleaning storage.', err))
            })
            .catch(err => console.log('Signout failed.', err))
    }

    return (
        <TouchableOpacity
            {...props}
            onPress={signout}
            style={styles.container}
        >
            <CloseCircleOutlined style={styles.icon} />
        </TouchableOpacity>
    )
}

export default Disconnect

const styles = StyleSheet.create({
    container: {
        flex: 1,
        display: 'flex',
        flexShrink: 0,
        flexBasis: 'auto',
        alignItems: 'center',
    },
    icon: {
        flex: 1,
        // lineHeight: 45,
        color: '#fff',
        paddingTop: 1,
    }
})