import React, { useContext } from 'react'
import {
    StyleSheet,
    Text,
    TouchableOpacity,
} from 'react-native'
import axios from 'axios'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { AppContext } from '../AppContext'
import { CloseCircleOutlined } from '@ant-design/icons'
const API_PATH = process.env.API_PATH || '/api'
import { navigate } from '../navigators/RootNavigation'
const Disconnect = props => {

    const {
        state,
        dispatch,
    } = useContext(AppContext)

    const signout = () => {
        const { user } = state
        console.log('signing out user')
        axios
            .post(`${API_PATH}/signout`, { _id: user._id })
            .then(({ data }) => {
                if (!data.success) throw new Error('Error signing out')
                
                AsyncStorage
                    .multiRemove(['route', 'userToken'], err => {
                        if (err) console.log('Error cleaning local storage', err)
                    })
                    .then(() => {
                        console.log('SIGNOUT')
                        dispatch({ type: 'SIGNOUT' })
                        // navigate('CheckIn')
                    })
            })
            .catch(err => console.log('logout failed:', err))
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