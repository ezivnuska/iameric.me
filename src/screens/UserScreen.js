import React, { useContext } from 'react'
import { AppContext } from '../AppContext'
import {
    DriverHome,
    OrderListContainer,
    PanelView,
    Screen,
    VendorDisplay,
    VendorHome,
} from '../components'

const UserScreen = props => {

    const {
        user,
    } = useContext(AppContext)

    const renderUserHome = () => {
        switch(user.role) {
            case 'customer': return <VendorDisplay />
            case 'driver': return <DriverHome />
            case 'vendor': return <VendorHome />
        }
    }
    return (
        <Screen>
            <OrderListContainer />
            
            {renderUserHome()}

        </Screen>
    )
}

export default UserScreen