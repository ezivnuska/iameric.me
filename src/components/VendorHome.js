import React, { useContext } from 'react'
import {
    StyleSheet,
    View,
} from 'react-native'
import {
    LocationDetails,
    ProductDisplay,
} from '.'
import { AppContext } from '../AppContext'

const VendorHome = () => {

    const { user } = useContext(AppContext)
    
    return (
        <View style={styles.container}>
            <LocationDetails user={user} />
            <ProductDisplay user={user} />
        </View>
    )
}

export default VendorHome

const styles = StyleSheet.create({
    container: { 
        marginHorizontal: 'auto',
        minWidth: 350,
        maxWidth: 450,
        width: 375,
    },
})