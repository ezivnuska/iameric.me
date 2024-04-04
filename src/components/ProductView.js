import React, { useContext, useEffect } from 'react'
import { FlatList } from 'react-native'
import ThemedText from './ThemedText'
import axios from 'axios'
import { ProductContext } from '../context/ProductContext'
import { UserContext } from '../context/UserContext'

export default () => {

    const [
        state,
        dispatch,
    ] = useContext(ProductContext)

    useEffect(() => {
        if (!state.loaded) init()
    }, [])

    const init = async () => {
        dispatch({ type: 'LOADING_PRODUCTS', payload: true })
        const { data } = await axios.get(`/api/products/${vendorId}`)
    
        if (data && data.users) {
            dispatch({ type: 'SET_USERS', payload: data.users })
        }
        
        dispatch({ type: 'LOADING_CONTACTS', payload: false })
        dispatch({ type: 'CONTACTS_LOADED', payload: true })
    }
    
    return (
        <FlatList
            data={state.contacts}
            keyExtractor={(contact, index) => `${index}-${contact.username}`}
            renderItem={({ item }) => <ThemedText>{item.username}</ThemedText>}
        />
    )
}