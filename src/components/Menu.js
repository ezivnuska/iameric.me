import React, { useEffect } from 'react'
import {
    FlatList,
} from 'react-native'
import {
    LoadingView,
    MenuItem,
    EmptyStatus,
} from '.'
import {
    useContacts,
} from '@context'

export default ({ vendor }) => {

    const { contactLoading } = useContacts()
    
    if (contactLoading) return <LoadingView loading={`Loading ${vendor.username}`} />

    return vendor && vendor.products
        ? (
            <FlatList
                data={vendor.products}
                keyExtractor={item => `product-${item._id}`}
                showsVerticalScrollIndicator={false}
                renderItem={({ item }) => (
                    <MenuItem
                        item={item}
                        username={vendor.username}
                    />
                )}
            />
        )
        : <EmptyStatus status='There are no available products at this time.' />
}