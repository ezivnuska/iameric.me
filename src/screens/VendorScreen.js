import React from 'react'
import {
    ContactModal,
    Vendor,
} from '@components'
import {
    Screen,
} from '.'
import {
    ContactContextProvider,
} from '@context'

export default ({ onPress, ...props }) => {

    const { navigation, route } = props
    const idFromParams = route.params.id
    return (
        <Screen {...props}>
            <ContactContextProvider>
                <Vendor
                    id={idFromParams}
                    onPress={() => navigation.reset({
                        index: 0,
                        routes: [{ name: 'VendorList' }],
                    })}
                />
                <ContactModal />
            </ContactContextProvider>
        </Screen>
    )
}