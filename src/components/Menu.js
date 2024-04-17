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
    
    if (contactLoading) return <LoadingView label={`Loading ${vendor.username}`} />

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