import React, { useContext } from 'react'
import {
    StyleSheet,
    View,
} from 'react-native'
import { AppContext } from '../AppContext'
import {
    CustomerHome,
    DriverHome,
    OrderDisplay,
    UserHeading,
    VendorHome,
} from '../components'

const UserScreen = props => {
    
    const {
        dispatch,
        state,
        user,
    } = useContext(AppContext)

    const { role } = user

    const renderUserHome = () => {
        switch(role) {
            case 'customer': return <CustomerHome />
            case 'driver': return <DriverHome />
            case 'vendor': return <VendorHome />
        }
    }
    return (
        <View style={styles.container} { ...props }>
            
            <View style={styles.heading}>
                <OrderDisplay />
            </View>
            
            {renderUserHome()}

        </View>
    )
}

export default UserScreen

const styles = StyleSheet.create({
    container: {

    },
    heading: {
        paddingHorizontal: 10,
        paddingVertical: 10,
    },
})