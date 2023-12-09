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
        if (secure && !user) {
            console.log('Secure Screen. Not secure. Need to go home.')
            setSecure(false)
        } else if (!secure) {
            setSecure(true)
        }
    }, [user])

    useContext(() => {
        if (!secure) navigate('Start')
    }, [secure])

    return user ? (
        <Screen>
            {children}
        </Screen>
    ) : null
}