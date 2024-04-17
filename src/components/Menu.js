import React, { useEffect } from 'react'
import {
    FlatList,
} from 'react-native'
import {
    LoadingView,
    MenuItem,
    EmptyStatus,
} from '.'
import { useContacts } from '@context'
import { loadVendorProducts } from '@utils/products'

export default ({ vendor }) => {

    const {
        contact,
        contactLoading,
        setContact,
        setContactLoading,
    } = useContacts()

    useEffect(() => {
        init()
    }, [])

    const init = async () => {
        setContactLoading(true)
        const products = await loadVendorProducts(vendor._id)
        setContactLoading(false)
        setContact({
            ...vendor,
            products,
        })
    }
    
    if (contactLoading) return <LoadingView label='Loading products' />

    return contact && contact.products
        ? (
            <FlatList
                data={contact.products}
                keyExtractor={item => `product-${item._id}`}
                showsVerticalScrollIndicator={false}
                renderItem={({ item }) => (
                    <MenuItem
                        item={item}
                        username={contact.username}
                    />
                )}
            />
        )
        : <EmptyStatus status='There are no available products at this time.' />
}