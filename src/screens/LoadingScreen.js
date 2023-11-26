import React, { useContext } from 'react'
import { Screen } from './'
import { LoadingView } from '@components'
import { AppContext } from '../AppContext'

export default () => {

    const {
        loading,
    } = useContext(AppContext)

    return (
        <Screen>
            <LoadingView label={loading} />
        </Screen>
    )
}