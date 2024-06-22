import React from 'react'
import { Menu } from '@components'
import { useProducts } from '@context'

export default () => {
    const { products, productsLoading } = useProducts()
    return (
        <Menu products={products} loading={productsLoading} />
    )
}