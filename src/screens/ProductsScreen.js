import React from 'react'
import { ProductsView } from '@components'
import { Screen } from '.'
import { ProductContextProvider } from '@context'

export default props => (
    <Screen {...props}>
        <ProductContextProvider>
            <ProductsView />
        </ProductContextProvider>
    </Screen>
)