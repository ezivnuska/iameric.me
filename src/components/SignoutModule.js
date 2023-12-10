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
import AsyncStorage from '@react-native-async-storage/async-storage'
import { cleanStorage } from '../utils/storage'

const ButtonItem = props => (
    <Button
        {...props}
        style={{
            marginBottom: 10,
        }}
    />
)

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
                            <View>
                                <ButtonItem
                                    type='primary'
                                    danger
                                    onClick={signout}
                                >
                                    Sign Out
                                </ButtonItem>
                                
                                <ButtonItem
                                    onClick={() => setModalVisible(false)}
                                >
                                    Cancel
                                </ButtonItem>
                            </View>
                        )
                }
            </PopUpModal>
        </View>
    )
}