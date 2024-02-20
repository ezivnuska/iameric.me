import React, { useContext } from 'react'
import {
    Cart,
} from '.'
import { AppContext } from '../AppContext'
import { navigationRef } from 'src/navigation/RootNavigation'

export default () => {

    const {
        dispatch,
    } = useContext(AppContext)

    const onSubmitted = order => {
        
        dispatch({ type: 'ADD_ORDER', order })
        
        dispatch({ type: 'CLOSE_MODAL' })
        
        navigationRef.navigate('Private', { screen: 'Orders' })
    }
    
    return (
        <Cart onSubmitted={onSubmitted} />
    )
}