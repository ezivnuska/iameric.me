import React from 'react'
import {
    CenterVertical,
    IconButton,
} from '@components'
import {
    useModal,
    useProducts,
} from '@context'
import { deleteProductWithId } from '@utils/products'

export default ({ productId }) => {
    const { closeModal } = useModal()
    const {
        deleteProduct,
        productsLoading,
        setProductsLoading,
    } = useProducts()

    const onDelete = async () => {
        
        setProductsLoading(true)
        const productDeleted = await deleteProductWithId(productId)
        setProductsLoading(false)

        if (productDeleted) {
            console.log(`${productDeleted.title} deleted`)
            deleteProduct(productDeleted._id)
        }

        closeModal()
    }
    
    return (
        <CenterVertical>
            <IconButton
                type='primary'
                label='Delete Product'
                onPress={onDelete}
                disabled={productsLoading}
                padded
            />
        </CenterVertical>
    )
}