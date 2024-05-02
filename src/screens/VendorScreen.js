import React from 'react'
import { Vendor } from '@components'
import { Screen } from '.'

export default ({ onPress, ...props }) => {

    const { navigation, route } = props
    const idFromParams = route.params.id
    
    return (
        <Screen {...props}>
            <Vendor
                id={idFromParams}
                onPress={() => navigation.reset({
                    index: 0,
                    routes: [{ name: 'VendorList' }],
                })}
            />
        </Screen>
    )
}