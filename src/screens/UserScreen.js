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
    VendorHome,
} from '../components'

const UserScreen = props => {

    const {
        user,
    } = useContext(AppContext)

    const renderUserHome = () => {
        switch(user.role) {
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
        // backgroundColor: 'yellow',
    },
})