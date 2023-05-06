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
const Disconnect = props => {

    const {
        state,
        dispatch,
    } = useContext(AppContext)

    const { user } = state
    const [working, setWorking] = useState(false)

    const signout = () => {
        setWorking(true)
        axios
            .post('/api/signout', { _id: user._id })
            .then(async ({ data }) => {
                if (!data.success) throw new Error('Error signing out')
                setWorking(false)
                dispatch({ type: 'SIGNOUT' })
            })
            .catch(err => console.log('Signout failed.', err))
    }

    return (user && !working) ? (
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