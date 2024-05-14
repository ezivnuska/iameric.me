import React from 'react'
import { ProductsView } from '@components'
import { Screen } from '.'

export default props => (
    <Screen {...props}>
        <ProductsView />
    </Screen>
)