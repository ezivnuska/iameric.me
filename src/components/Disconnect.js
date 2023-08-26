import React, { useContext, useState } from 'react'
import {
    ActivityIndicator,
    StyleSheet,
    // Text,
    TouchableOpacity,
} from 'react-native'
import axios from 'axios'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { AppContext } from '../AppContext'
import { CloseCircleOutlined } from '@ant-design/icons'
import { navigate } from '../navigators/RootNavigation'
import { cleanStorage } from '../Auth'

const Disconnect = props => {

    const {
        state,
        dispatch,
    } = useContext(AppContext)

    const { user } = state
    const [loading, setLoading] = useState(false)

    const signout = async () => {
        setLoading(true)
        dispatch({ type: 'SIGNOUT' })
        await axios.post('/api/signout', { _id: user._id })
        await cleanStorage()
        setLoading(false)
    }

    return !loading ? (
        <TouchableOpacity
            {...props}
            onPress={signout}
            style={styles.container}
        >
            <CloseCircleOutlined size='large' style={{ color: '#fff' }} />
        </TouchableOpacity>
    ) : <ActivityIndicator size='small' />
}

export default Disconnect

const styles = StyleSheet.create({
    container: {
        paddingVertical: 5,
    },
    icon: {
        color: '#fff',
    }
})