import React, { useContext } from 'react'
import {
    StyleSheet,
    View,
} from 'react-native'
import {
    LocationDisplay,
    ProductDisplay,
} from '../components'
import { AppContext } from '../AppContext'
import defaultStyles from '../styles'

const VendorScreen = ({ navigation }) => {

    const {
        dispatch,
        state,
    } = useContext(AppContext)

    const { user } = state
    
    return user ? (
        <View style={styles.container}>
            <LocationDisplay user={user} />
            <ProductDisplay user={user} />
        </View>
    ) : null
}

export default VendorScreen

const styles = StyleSheet.create({
    container: {
        marginHorizontal: 'auto',
        minWidth: 300,
        maxWidth: 450,
        width: 400,
    },
})