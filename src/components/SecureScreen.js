import React, { useContext, useEffect, useState } from 'react'
import {
    Screen,
} from '@components'
import { AppContext } from '../AppContext'
import { navigate } from '@navigators/RootNavigation'

export default ({ children }) => {

    const {
        user,
    } = useContext(AppContext)

    const [secure, setSecure] = useState(false)

    useEffect(() => {
        setSecure(user !== null)
    }, [user])

    useEffect(() => {
        if (!secure && !user) navigate('Start')
    }, [secure])

    return secure && (
        <Screen>
            {children}
        </Screen>
    )
}