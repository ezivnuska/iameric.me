import React, { useContext, useState } from 'react'
import {
    View,
} from 'react-native'
import {
    LoadingView,
    PopUpModal,
} from '.'
import { Button } from 'antd'
import axios from 'axios'
import { AppContext } from '../AppContext'
import { navigate } from '@navigators/RootNavigation'
// import AsyncStorage from '@react-native-async-storage/async-storage'
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
        
        setLoading(false)
        
        dispatch({ type: 'SIGNOUT' })
    }

    const validateClose = () => {
        if (!loading) setModalVisible(false)
    }

    return (
        <View
            style={{
                marginTop: 50,
            }}
        >
            <Button
                type='dashed'
                size='large'
                danger
                onClick={() => setModalVisible(true)}
            >
                Sign Out
            </Button>

            <PopUpModal
                visible={modalVisible}
                onRequestClose={validateClose}
            >
                {
                    loading
                        ? <LoadingView label={loading} />
                        : (
                            <View
                                style={{
                                    display: 'flex',
                                    flexDirection: 'column',
                                    justifyContent: 'space-around',
                                }}
                            >
                                <Button
                                    size='large'
                                    type='primary'
                                    danger
                                    onClick={signout}
                                >
                                    Sign Out
                                </Button>
                            </View>
                        )
                }
            </PopUpModal>
        </View>
    )
}