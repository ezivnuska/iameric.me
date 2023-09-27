import React, { useContext } from 'react'
import { AppContext } from '../AppContext'
import {
    CenteredContent,
    OrderListContainer,
    ProductDisplay,
    Screen,
    VendorDisplay,
} from '../components'

export default ({ navigation, route }) => {

    const {
        user,
    } = useContext(AppContext)

    return (
        <Screen>

            <CenteredContent>

                {user && <OrderListContainer />}
                
            </CenteredContent>

            {
            user.role === 'customer'
            ?
            (<CenteredContent>
                <VendorDisplay />
            </CenteredContent>)
            :
            user.role === 'vendor'
            ?
            (<CenteredContent>
                <ProductDisplay user={user} />
            </CenteredContent>)
            :
            null
            }

        </Screen>
    )
}