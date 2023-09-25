import React, { useContext } from 'react'
import {
    CloseButton,
} from '.'
import axios from 'axios'
import { AppContext } from '../AppContext'
import { cleanStorage } from '../Auth'
import { navigate } from '../navigators/RootNavigation'

const Disconnect = props => {

    const {
        state,
        dispatch,
    } = useContext(AppContext)

    const { user } = state

    // const setLoading = value => dispatch({ type: 'SET_LOADING', loading: value })
    
    const signout = async () => {
        // setLoading(true)
        await cleanStorage()
        const { data } = await axios.post('/api/signout', { _id: user._id })
        console.log('signed out', data.user)
        if (!data) return console.log('could not sign out user')
        console.log('signing out user')
        dispatch({ type: 'SIGNOUT' })
        
        // navigate('Start')
        // setLoading(false)
    }

    return <CloseButton onPress={signout} />
}

export default Disconnect