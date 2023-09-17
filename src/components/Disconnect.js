import React, { useContext, useState } from 'react'
import {
    View,
} from 'react-native'
import {
    CloseButton,
    LoadingView,
    ModalContainer,
    PanelView,
} from '.'
import axios from 'axios'
import { AppContext } from '../AppContext'
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
        await cleanStorage()
        const { data } = await axios.post('/api/signout', { _id: user._id })
        console.log('signed out', data.user)
        setLoading(false)
        if (!data) return console.log('could not sign out user')
        dispatch({ type: 'SIGNOUT' })
    }

    return (
        <View>
            <CloseButton onPress={signout} />

            <ModalContainer
                animationType='none'
                transparent={true}
                visible={loading}
            >
                <PanelView style={{ height: '100%' }}>
                    <LoadingView label='signing out...' />
                </PanelView>
            </ModalContainer>
        </View>
    )
}

export default Disconnect