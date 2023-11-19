import React, { useContext, useState } from 'react'
import {
    View,
} from 'react-native'
import {
    LoadingView,
    ModalContent,
} from '.'
import { Button } from 'antd'
import { cleanStorage } from '../utils/storage'
import axios from 'axios'
import { AppContext } from '../AppContext'

export default () => {

    const {
        dispatch,
        user,
    } = useContext(AppContext)

    const [modalVisible, setModalVisible] = useState(false)
    const [loading, setLoading] = useState(null)

    const signout = async () => {

        setLoading('Signing out...')
        
        const { data } = await axios.
        post('/api/signout', { _id: user._id })
        
        if (!data) {
            console.log('could not sign out user')
            setLoading(false)
            return
        }
        
        await cleanStorage()

        dispatch({ type: 'SIGNOUT' })
    }

    const validateClose = () => {
        if (!loading) setModalVisible(false)
    }

    return (
        <View>
            <Button
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