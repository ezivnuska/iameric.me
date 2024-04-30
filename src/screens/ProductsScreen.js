import React from 'react'
import { Products } from '@components'
import { Screen } from '.'
import { ProductContextProvider } from '@context'

export default props => (
    <Screen {...props}>
        <ProductContextProvider>
            <Products />
        </ProductContextProvider>
    </Screen>
)