import React, { useContext } from 'react'
import {
    StyleSheet,
    Text,
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
        width: '100%',
    },
    heading: {
        fontWeight: 600,
        fontSize: 20,
        marginBottom: 5,
    }
})