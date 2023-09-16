import React, { useContext, useState } from 'react'
import {
    ActivityIndicator,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native'
import axios from 'axios'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { AppContext } from '../AppContext'
import { CloseCircleOutlined } from '@ant-design/icons'
import { navigate } from '../navigators/RootNavigation'
import { cleanStorage } from '../Auth'
import {
    CloseButton,
    LoadingView,
    ModalContainer,
} from '.'

const Disconnect = props => {

    const {
        state,
        dispatch,
    } = useContext(AppContext)

    const { user } = state
    const [loading, setLoading] = useState(false)
    
    const signout = async () => {
        setLoading(true)
        await cleanStorage()
        const { data } = await axios.post('/api/signout', { _id: user._id })
        console.log('signed out', data.user)
        setLoading(false)
        if (!data) return console.log('could not sign out user')
        dispatch({ type: 'SIGNOUT' })
    }

    return (
        <View style={styles.container}>
            <CloseButton onPress={signout} />

            <ModalContainer
                animationType='none'
                transparent={true}
                visible={loading}
            >
                <LoadingView label='signing out...' />
            </ModalContainer>
        </View>
    )
}

export default Disconnect

const styles = StyleSheet.create({
    container: {
        
    },
    button: {
        paddingVertical: 5,
    },
    icon: {
        color: '#fff',
    }
})