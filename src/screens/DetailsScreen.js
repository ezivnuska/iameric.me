import React, { useContext } from 'react'
import {
    StyleSheet,
    View,
} from 'react-native'
import {
    Screen,
    Storefront,
} from '../components'
import { AppContext } from '../AppContext'
import defaultStyles from '../styles'

const DetailsScreen = ({ navigation, route }) => {

    const {
        dispatch,
        state,
        cart,
    } = useContext(AppContext)

    // const { cart, user } = state
    const { id } = route.params
    
    return (
        <Screen>
            <Storefront id={id} />
        </Screen>
    )
}

export default DetailsScreen

const styles = StyleSheet.create({
    container: { 
        marginHorizontal: 'auto',
        minWidth: 350,
        maxWidth: 450,
        width: 375,
    },
})