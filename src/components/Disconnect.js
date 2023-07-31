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
        await axios.post('/api/signout', { _id: user._id })
        await cleanStorage()
        setLoading(false)
        dispatch({ type: 'SIGNOUT' })
    }

    return !loading ? (
        <TouchableOpacity
            {...props}
            onPress={signout}
            style={styles.container}
        >
            <CloseCircleOutlined style={styles.icon} />
        </TouchableOpacity>
    ) : <ActivityIndicator size='small' />
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