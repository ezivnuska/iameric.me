import React, { useContext, useEffect } from 'react'
import {
    LoadingView,
    Screen,
} from '@components'
import { AppContext } from '../AppContext'
import { CenteredView } from 'src/components'
import { checkAuth } from '../utils/auth'

export default ({ navigation }) => {
    
    const {
        dispatch,
    } = useContext(AppContext)
    
    useEffect(() => {
        start()
    }, [])

    const start = async () => {
        console.log(`\n<< splash >>\n\n`)

        await checkAuth(dispatch)
    }

    return (
        <Screen>
            <CenteredView>
                <LoadingView />
            </CenteredView>
        </Screen>
    )
}