import React, { useContext, useEffect, useState } from 'react'
import {
    Text,
    View,
} from 'react-native'
import {
    // IconButton,
    LoadingView,
    // OrderDetails,
    OrderList,
    // PopUpModal,
} from '.'
import axios from 'axios'
import { AppContext } from '../AppContext'
// import { loadOrders } from '../utils/data'
import { cleanStorage } from '../utils/storage'
import classes from '../styles/classes'
import { navigationRef } from 'src/navigators/RootNavigation'

export default () => {
    
    const {
        dispatch,
        loaded,
        loading,
        user,
        // orders,
    } = useContext(AppContext)

    const [items, setItems] = useState(null)
    // const [featuredItem, setFeaturedItem] = useState(null)

    // useEffect(() => {
    //     console.log('USER>', user)
    //     if (user) getOrders()
    // }, [user])

    // useEffect(() => {
    //     console.log('<< order changed >>')
    //     setItems(orders)
    //     // if (orders) {
    //     //     setItems(orders)
    //     //     if (orders.length) {
    //     //     } else {
    //     //         gotoNextScreen()
    //     //     }
    //     // }
    // }, [orders])

    useEffect(() => {
        if (!loaded) signout()
    }, [loaded])

    // const getOrders = async () => {
    //     const loadedOrders = await loadOrders(dispatch, user._id)
    //     setItems(loadedOrders)
    // }

    const signout = async () => {

        dispatch({ type: 'SET_LOADING', loading: 'Signing out...' })
        
        const { data } = await axios
            .post('/api/signout', { _id: user._id })
        
        if (!data) {
            console.log('could not sign out user')
        } else {
            
            await cleanStorage()
            
            console.log('signed out user')
            
            dispatch({ type: 'SET_LOADING', loading: null })
            dispatch({ type: 'SET_LOADED', loaded: null })
            dispatch({ type: 'SIGNOUT' })
    
            navigationRef.navigate('Start')
        }
    }

    // const gotoNextScreen = () => {
    //     if (!user) return
    //     let nextScreen = 'Forum'
    //     if (user.role === 'customer') nextScreen = 'Vendors'
    //     if (user.role === 'vendor') nextScreen = 'Products'
    //     navigationRef.navigate('Private', { screen: nextScreen })
    // }

    // const getFeaturedItem = id => {
    //     return orders.filter((order, index) => order._id === id)[0]
    // }

    // const removeOrder = id => {
    //     dispatch({ type: 'REMOVE_ORDER', id })
    // }

    // const deleteOrder = async id => {
        
    //     dispatch({ type: 'SET_LOADING', loading: 'Deleting order...' })

    //     await axios.delete(`/api/order/${id}`)
        
    //     removeOrder(id)

    //     dispatch({ type: 'SET_LOADING', loading: null })
    // }

    // const cancelOrder = async () => {

    //     deleteOrder(featuredItem)

    //     setFeaturedItem(null)
    // }

    // const setOrderConfirmed = id => {
    //     const item = {
    //         ...getItemById(id),
    //         status: 1,
    //     }
    //     setItems(orders.map(i => (i._id == id) ? item : i))

    //     setFeaturedItem(null)
    // }

    // const confirmOrder = async () => {

    //     dispatch({ type: 'SET_LOADING', loading: 'Confirming order...' })

    //     const order = await axios.
    //         post(`/api/order/confirm/${featuredItem}`)
        
            
    //     if (!order) {
    //         console.log('Error confirming order')
    //     } else {
    //         dispatch({ type: 'CONFIRM_ORDER', id: featuredItem })
    //         setOrderConfirmed(order._id)
    //     }
            
    //     dispatch({ type: 'SET_LOADING', loading: null })

    // }

    // const getItemById = id => orders.filter(item => item._id == id)[0]

    // const setOrderAccepted = id => {
    //     const item = {
    //         ...getItemById(id),
    //         status: 2,
    //     }
        
    //     setItems(orders.map(i => i._id == id ? item : i))
    // }

    // const acceptDelivery = async () => {

    //     dispatch({ type: 'SET_LOADING', loading: 'Accepting delivery...' })

    //     const { data } = await axios.
    //         post('/api/order/accept', { id: featuredItem, driver: user._id })
        
            
    //     if (!data) console.log('Error confirming order')
    //     else {
    //         dispatch({ type: 'ACCEPT_ORDER', order: data })
    //         setOrderAccepted(data._id)
    //     }
        
    //     dispatch({ type: 'SET_LOADING', loading: null })

    // }

    // const setOrderReceived = id => {
    //     const item = {
    //         ...getItemById(id),
    //         status: 2,
    //     }
    //     console.log('item picked up', item)
    //     setItems(orders.map(i => i._id == id ? item : i))

    //     setFeaturedItem(null)
    // }

    // const receivedOrder = async () => {

    //     dispatch({ type: 'SET_LOADING', loading: 'Receiving order...' })

    //     const order = await axios.
    //         post('/api/order/received', { id: featuredItem, driver: user._id })
        
            
    //     if (!order) console.log('Error marking order picked up')
    //     else {
    //         dispatch({ type: 'ORDER_RECEIVED', id: featuredItem, driver: user._id })
    //         setOrderReceived(order._id)
    //     }

    //     dispatch({ type: 'SET_LOADING', loading: null })

    // }

    // const completeDelivery = async () => {
        
    //     dispatch({ type: 'SET_LOADING', loading: 'Completing delivery...' })
        
    //     const order = await axios.
    //         post(`/api/order/complete/${featuredItem}`)
            
    //     if (!order) console.log('Error completing order')
    //     else {
    //         dispatch({ type: 'COMPLETE_ORDER', id: featuredItem })
    //         setFeaturedItem(null)
    //     }
        
    //     dispatch({ type: 'SET_LOADING', loading: null })

    // }

    // const renderOrderProcessButton = status => {
    //     console.log('status', status)
    //     switch (user.role) {
    //         case 'customer':
    //         case 'admin':
    //             return (
    //                 <IconButton
    //                     label='Cancel Order'
    //                     onPress={cancelOrder}
    //                     disabled={loading}
    //                     bgColor='red'
    //                 />
    //             )
    //         break
    //         case 'vendor':
    //             if (status == 0)
    //                 return <IconButton label='Confirm Order' onPress={confirmOrder} disabled={loading} />
                    
    //             if (status == 4)
    //                 return <IconButton label='Clear Order' onPress={cancelOrder} disabled={loading} />
    //         break
    //         case 'driver':
    //             switch (status) {
    //                 case 1:
    //                     return <IconButton label='Accept Delivery' onPress={acceptDelivery} disabled={loading} />
    //                 break
    //                 case 2:
    //                     return <IconButton label='Picked Up' onPress={receivedOrder} disabled={loading} />
    //                 break
    //                 case 3:
    //                     return <IconButton label='Order Completed' onPress={completeDelivery} disabled={loading} />
    //                 break
    //                 case 4:
    //                     return <IconButton label='Clear Order' onPress={cancelOrder} disabled={loading} />
    //                 break
    //                 default:
    //                     return null

    //             } 
    //         break
    //         default:
    //             return null
    //     }
    // }

    // const renderOrderProcessForm = id => {
    //     const order = orders ? getFeaturedItem(id) : null
    //     if (!order) return null
    //     // console.log('renderOrderProcessForm', order)
    //     return (
    //         <View>
    //             <OrderDetails order={order} />
    //             {renderOrderProcessButton(order.status)}
    //         </View>
    //     )
    // }

    // const onPress = order => {
    //     setFeaturedItem(order._id)
    // }

    // const renderOrders = () => {
    //     if (loading) return <Text>Loading Orders...</Text>
    //     if (!orders || !orders.length) return null
    //     // const items = relevantOrders(orders)
    //     // console.log('rel orders', items)
        
    //     return (
    //         <View>
    //             <View
    //                 style={{
    //                     display: 'flex',
    //                     flexDirection: 'row',
    //                     justifyContent: 'flex-start',
    //                     columnGap: '3%',
    //                     flexWrap: 'wrap',
    //                 }}
    //             >
    //                 {orders.map((order, index) => (
    //                     <OrderPreview
    //                         key={`order-preview-${index}`}
    //                         onPress={() => onPress(order)}
    //                         order={order}
    //                     />
    //                 ))}
    //             </View>
            
    //             <PopUpModal
    //                 visible={featuredItem}
    //                 onRequestClose={() => setFeaturedItem(null)}
    //             >
    //                 {featuredItem ? renderOrderProcessForm(featuredItem) : null}
    //             </PopUpModal>
    //         </View>
    //     )
    // }

    return (
        <View style={{
            marginVertical: 10,
        }}>
            <OrderList />
            
            {/* <PopUpModal
                visible={featuredItem}
                onRequestClose={() => setFeaturedItem(null)}
            >
                {renderOrderProcessForm(featuredItem)}
            </PopUpModal> */}
        </View>
    )
}