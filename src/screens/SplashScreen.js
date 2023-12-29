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
        start()
    }, [])

    useEffect(() => {
        if (user) {
            navigation.navigate('Secure', {
                screen: 'Tabs',
                params: {
                    screen: 'Users',
                },
            })
        }
    }, [user])

    const start = async () => {
        const verified = await initialize(dispatch)
        
        if (verified) {
            dispatch({ type: 'SET_USER', user: verified })
            dispatch({ type: 'SET_VERIFIED', verified: true })
        }
    }

    return (
        <Screen>
            <CenteredView>
                <LoadingView />
            </CenteredView>
        </Screen>
    )
}