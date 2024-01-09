import React, { useContext, useEffect } from 'react'
import {
    LoadingView,
    Screen,
} from '@components'
import { AppContext } from '../AppContext'
import { CenteredView } from 'src/components'
import { initialize } from '../utils/auth'

export default ({ navigation }) => {
    
    const {
        dispatch,
        loading,
        user,
    } = useContext(AppContext)
    
    useEffect(() => {
        console.log('splash')
        start()
    }, [])

    useEffect(() => {
        if (user) {
            console.log('SplashScreen found user, navigating to Private.')
            navigation.navigate('Private')
        }
    }, [user])

    const start = async () => {
        console.log('starting')
        dispatch({ type: 'SET_LOADING', loading: 'Verifying user...' })

        const verified = await initialize(dispatch)
        console.log('verified', verified)
        if (verified) {
            dispatch({ type: 'SET_USER', user: verified })
            dispatch({ type: 'SET_VERIFIED', verified: true })
        } else {
            navigation.navigate('Start')
        }

        dispatch({ type: 'SET_LOADING', loading: null })
    }

    return (
        <Screen>
            <CenteredView>
                <LoadingView />
            </CenteredView>
        </Screen>
    )
}