import React, { useContext } from 'react'
import { AppContext } from '../AppContext'
import {
    CustomerHome,
    DriverHome,
    OrderListContainer,
    PanelView,
    Screen,
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
        <Screen>
            <OrderListContainer />
            
            {renderUserHome()}

        </Screen>
    )
}

export default UserScreen