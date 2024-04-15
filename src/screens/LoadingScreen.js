import React from 'react'
import { Screen } from '.'
import { LoadingView } from '@components'

export default props => {

    return (
        <Screen>
            <LoadingView {...props} />
        </Screen>
    )
}