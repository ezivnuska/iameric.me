import React, { useContext, useState } from 'react'
import {
    View,
} from 'react-native'
import {
    LoadingView,
    ModalContent,
} from '.'
import { Button } from 'antd'
import axios from 'axios'
import { AppContext } from '../AppContext'
import { navigate } from '@navigators/RootNavigation'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { cleanStorage } from '../utils/storage'

export default () => {

    const {
        dispatch,
        user,
    } = useContext(AppContext)

    const [modalVisible, setModalVisible] = useState(false)
    const [loading, setLoading] = useState(null)

    const signout = async () => {

        setLoading('Signing out...')
        
        const { data } = await axios
            .post('/api/signout', { _id: user._id })
        
        if (!data) {
            console.log('could not sign out user')
            return
        }
        
        await cleanStorage()
        
        dispatch({ type: 'SIGNOUT' })
        
        setLoading(false)

        navigate('Start')
    }

    const validateClose = () => {
        if (!loading) setModalVisible(false)
    }

    return (
        <View>
            <Button
                type='default'
                onClick={() => setModalVisible(true)}
            >
                Sign Out
            </Button>

            <ModalContent
                visible={modalVisible}
                onRequestClose={validateClose}
            >
                {
                    loading
                        ? <LoadingView label={loading} />
                        : (
                            <View>
                                <Button
                                    type='primary'
                                    onClick={signout}
                                >
                                    Sign Out
                                </Button>
                                
                                <Button
                                    onClick={() => setModalVisible(false)}
                                >
                                    Cancel
                                </Button>
                            </View>
                        )
                }
            </ModalContent>
        </View>
    )
}