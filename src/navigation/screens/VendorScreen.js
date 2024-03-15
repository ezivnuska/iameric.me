import React, { useContext, useEffect, useState } from 'react'
import {
    Image,
} from 'react-native'
import {
    IconButton,
    LoadingView,
    Menu,
} from '@components'
import {
    Screen,
    ScreenTitle,
} from '.'
import { AppContext } from '../../AppContext'
import { loadUserById } from '@utils/data'
import { useTheme } from 'react-native-paper'
import axios from 'axios'

const IMAGE_PATH = __DEV__ ? 'https://iameric.me/assets' : '/assets'

export default ({ navigation, route }) => {

    const theme = useTheme()

    const {
        dispatch,
        loading,
        getUserById,
    } = useContext(AppContext)

    const [products, setProducts] = useState(null)
    // const [userDetails, setUserDetails] = useState(null)

    const { id } = route.params
    const userDetails = getUserById(id)

    const getProducts = async () => {
        
        dispatch({ type: 'SET_LOADING', loading: 'Loading menu...' })
        
        const { data } = await axios.get(`/api/products/${id}`)
        
        if (!data) {
            console.log('could not get vendor products')
        } else if (!data.products || !data.products.length) {
            console.log('No products found')
            setProducts([])
        } else {
            setProducts(data.products)
        }
        
        dispatch({ type: 'SET_LOADING', loading: null })
    }

    useEffect(() => {
        if (!id) console.log('missing required id param')
        else if (!userDetails || (userDetails && userDetails._id !== id)) {
            loadUserDetails(id)
        }
    }, [])

    useEffect(() => {
        if (userDetails && !products) getProducts()
    }, [userDetails])
    
    const loadUserDetails = async id => {

        dispatch({ type: 'SET_LOADING', loading: 'Loading vendor details...' })
        
        const user = await loadUserById(id)

        if (!user) {
            console.log('Error loading user details.')
        } else {
            setUserDetails(user)
        }
        
        dispatch({ type: 'SET_LOADING', loading: null })
    }

    if (loading) return <LoadingView />

    return (
        <Screen
            titleComponent={
                <ScreenTitle
                    title={userDetails?.username || 'Restaurant'}
                >
                    <IconButton
                        label='Return to Vendors'
                        onPress={() => navigation.reset({
                            index: 0,
                            routes: [{ name: 'VendorList' }],
                        })}
                        disabled={loading}
                        textStyles={{
                            fontSize: 16,
                            fontWeight: 400,
                            color: theme?.colors.textDefault,
                        }}
                        outline
                        transparent
                    />
                </ScreenTitle>
            }
        >       
            {userDetails ? (
                <Menu
                    loading={loading}
                    products={products}
                    vendor={userDetails}
                />
            ) : null}
        </Screen>
    )
}