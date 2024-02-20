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
    
    return (
        <View
            style={{
                height: '100%',
                marginVertical: 10,
            }}
        >
            {loading
                ? <LoadingView label={loading} />
                : (products && products.length)
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
                        <ThemedText>No products to display.</ThemedText>
                    )
            }

        </View>
    )
}