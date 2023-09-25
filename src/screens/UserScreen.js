import React, { useContext, useEffect, useState } from 'react'
import { AppContext } from '../AppContext'
import {
    LoadingView,
    // DriverHome,
    OrderListContainer,
    PanelView,
    ProductDisplay,
    Screen,
    SecureBox,
    VendorDisplay,
} from '../components'
import { navigate, navigationRef } from '../navigators/RootNavigation'

const UserScreen = ({ navigation, route }) => {

    const {
        dispatch,
        loaded,
        orders,
        user,
        vendors,
    } = useContext(AppContext)

    // const [ready, setReady] = useState(false)

    useEffect(() => {
        // console.log('Current Route', route.name)
        // console.log('USERSCREEN', (user !== null), loaded)
        // if (!user || !loaded) navigate('Start')
        // console.log('ready....')
        // setReady(true)
    }, [])

    // useEffect(() => {
    //     console.log('loaded', loaded)

    //     console.log('state.orders', orders)
    //     console.log('state.vendors', vendors)
    // }, [loaded])

    // const loadData = async () => {
    //     await getOrders()
    //     await getVendors()
    //     switch(user.role) {
    //         case 'customer':
    //             //
    //             break
    //         case 'vendor':
    //             await getProducts()
    //             break
    //         case 'driver':
    //             //
    //     }

    //     dispatch({ type: 'DATA_LOADED' })
    // }

    // const getProducts = async () => {
        
    //     setLoading(true)
        
    //     const { data } = await axios.
    //         get(`/api/products/${user._id}`)
        
    //     setLoading(false)
        
    //     if (!data) {
    //         console.log('Error getting products:')
    //         return null
    //     }

    //     dispatch({ type: 'SET_PRODUCTS', vendor: user._id, products: data.items })

    //     return data.items
    // }

    // const getOrders = async () => {
        
    //     setLoading(true)

    //     const url = () => {
    //         switch (user.role) {
    //             case 'customer':
    //             case 'vendor':
    //                 return `/api/orders/${user._id}`
    //             break
    //             case 'driver':
    //                 return  `/api/orders`
    //             break
    //         }
    //     }
        
    //     const { data } = await axios.get(url())
        
    //     setLoading(false)
        
    //     if (!data) {
    //         console.log('could not get user orders')
    //         return null
    //     }
    //     console.log('orders', data)
    //     dispatch({ type: 'SET_ORDERS', orders: data })

    //     return data
    // }
    
    // const getVendors = async () => {
    //     setLoading(true)

    //     const { data } = await axios.
    //         get('/api/vendors')
            
    //     setLoading(false)

    //     if (!data) {
    //         console.log('Error: could not get vendors')
    //         return null
    //     }
        
    //     dispatch({ type: 'SET_VENDORS', vendors: data.vendors })

    //     return data.vendors
    // }

    const renderUserHome = () => {
        switch(user.role) {
            case 'customer': return <VendorDisplay />
            // case 'driver': return <DriverHome />
            case 'vendor': return <ProductDisplay user={user} />
            default: return console.log('no user...')
        }
    }
    return (
        <Screen>

            <PanelView type='full'>
                {user && <OrderListContainer />}

                <SecureBox>
                    {renderUserHome()}
                </SecureBox>
            </PanelView>

        </Screen>
    )
}

export default UserScreen