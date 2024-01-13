import React, { useContext, useState } from 'react'
import {
    Text,
    View,
} from 'react-native'
import {
    IconButton,
    LoadingView,
    PopUpModal,
} from '.'
import axios from 'axios'
import { AppContext } from '../AppContext'
import { cleanStorage } from '../utils/storage'
import classes from '../styles/classes'

export default () => {

    const {
        dispatch,
        loading,
        user,
    } = useContext(AppContext)

    const [modalVisible, setModalVisible] = useState(false)

    const showModal = () => {
        setModalVisible(true)
    }

    const hideModal = () => {
        setModalVisible(false)
    }
    
    const signout = async () => {

        dispatch({ type: 'SET_LOADING', loading: 'Signing out...' })
        
        const { data } = await axios
            .post('/api/signout', { _id: user._id })
        
        if (!data) {
            console.log('could not sign out user')
            return
        }
        
        await cleanStorage()
        
        dispatch({ type: 'SET_LOADING', loading: null })
        
        dispatch({ type: 'SET_VERIFIED', verified: false })
    }

    const validateClose = () => {
        if (!loading) hideModal()
    }

    return (
        <View
            style={{
                marginTop: 20,
            }}
        >
            <View style={{ marginBottom: 5 }}>
                
                <Text style={classes.headerSecondary}>
                    Sign Out
                </Text>

                <Text
                    style={[
                        classes.textDefault,
                        {
                            marginBottom: 15,
                        },
                    ]}
                >
                    See you next time!
                </Text>

            </View>

            <IconButton
                label='Sign Out'
                onPress={showModal}
                disabled={modalVisible}
                bgColor={modalVisible ? 'gray' : 'blue'}
            />

            <PopUpModal
                visible={modalVisible}
                onRequestClose={validateClose}
            >
                <View
                    style={{
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'space-around',
                    }}
                >

                    <IconButton
                        label='Sign Out'
                        onPress={signout}
                        disabled={loading}
                        bgColor='gray'
                    />
                </View>
                
            </PopUpModal>
        </View>
    )
}