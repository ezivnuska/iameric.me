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
        // console.log('splash')
        start()
    }, [])

    useEffect(() => {
        if (user) {
            console.log('SplashScreen found user, navigating to Private.')
            navigation.navigate('Private')
        }
    }, [user])

    const start = async () => {

        const verifiedUser = await initialize(dispatch)
        console.log('start:verifiedUser', verifiedUser)
        if (!verifiedUser) {
            navigation.navigate('Start')
        }
        // else navigation.navigate('Private')
    }

    return (
        <Screen>
            <CenteredView>
                <LoadingView />
            </CenteredView>
        </Screen>
    )
}