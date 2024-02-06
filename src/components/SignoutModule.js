import React, { useContext, useEffect, useState } from 'react'
import {
    View,
} from 'react-native'
import {
    ThemedText,
    IconButton,
    PopUpModal,
} from '.'
import { AppContext } from '../AppContext'
import { signout } from '../utils/auth'
import classes from '../styles/classes'
import { navigationRef } from 'src/navigators/RootNavigation'

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

    useEffect(() => {
        if (!loading && user) initSignout()
    }, [loading])

    const initSignout = async () => {
        
        await signout(dispatch, user._id)

        navigationRef.navigate('Start')
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
                
                <ThemedText style={classes.headerSecondary}>
                    Sign Out
                </ThemedText>

                <ThemedText
                    style={{ marginBottom: 15 }}
                >
                    See you next time!
                </ThemedText>

            </View>

            <IconButton
                type='primary'
                label='Sign Out'
                onPress={showModal}
                disabled={modalVisible}
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
                        type='primary'
                        label='Sign Out'
                        onPress={signout}
                        disabled={loading}
                    />
                </View>
                
            </PopUpModal>
        </View>
    )
}