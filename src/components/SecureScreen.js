import React, { useContext, useEffect } from 'react'
import {
    Screen,
} from '@components'
import { AppContext } from '../AppContext'
import { navigate } from '@navigators/RootNavigation'

export default ({ children }) => {

    const {
        user,
    } = useContext(AppContext)

    useEffect(() => {
        if (!user) navigate('Start')
    }, [user])

    return user && (
        <Screen>
            {children}
        </Screen>
    )
}