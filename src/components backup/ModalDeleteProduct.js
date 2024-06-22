import React from 'react'
import { View } from 'react-native'
import {
    IconButton,
} from '@components'
import {
    useModal,
    useProducts,
} from '@context'
import { deleteProductWithId } from '@utils/products'
import { classes } from '@styles'

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
        <View style={classes.centerV}>
            <IconButton
                type='primary'
                label='Delete Product'
                onPress={onDelete}
                disabled={productsLoading}
                padded
            />
        </View>
    )
}