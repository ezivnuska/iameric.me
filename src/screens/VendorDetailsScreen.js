import React, { useContext } from 'react'
import {
    StyleSheet,
    View,
} from 'react-native'
import {
    Storefront,
} from '../components'
import { AppContext } from '../AppContext'
import defaultStyles from '../styles'

const VendorDetailsScreen = ({ navigation, route }) => {

    const {
        dispatch,
        state,
        user,
        cart,
    } = useContext(AppContext)

    // const { cart, user } = state
    const { vendor } = route.params
    return user ? (
        <View style={styles.container}>
            <Storefront vendor={vendor} />
        </View>
    ) : null
}

export default VendorDetailsScreen

const styles = StyleSheet.create({
    container: { 
        marginHorizontal: 'auto',
        minWidth: 350,
        maxWidth: 450,
        width: 375,
    },
})