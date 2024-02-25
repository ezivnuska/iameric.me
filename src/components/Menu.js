import React, { useContext, useEffect, useState } from 'react'
import {
    FlatList,
    View,
} from 'react-native'
import {
    ThemedText,
    LoadingView,
    MenuItem,
} from '.'
import { AppContext } from '../AppContext'
import axios from 'axios'

export default ({ loading, products, vendor }) => {
    
    if (loading) return <LoadingView label={loading} />
    return products && products.length
        ? (
            <FlatList
                data={products}
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
        : (
            <ThemedText
                style={{ paddingHorizontal: 10 }}
            >
                There are no available products at this time.
            </ThemedText>
        )
}