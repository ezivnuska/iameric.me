import React from 'react'
import {
    ProductModal,
    Products,
} from '@components'
import { Screen } from '.'
import { ProductContextProvider } from '@context'

export default props => (
    <Screen {...props}>
        <ProductContextProvider>
            <Products />
            <ProductModal />
        </ProductContextProvider>
    </Screen>
)