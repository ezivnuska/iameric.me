import React, { useEffect, useState } from 'react'
import {
    View,
} from 'react-native'
import {
    EmptyStatus,
    VendorList,
} from '@components'
import {
    Screen,
    ScreenTitle,
} from '.'
import { loadUsersByRole } from '@utils/contacts'

export default props => {

    const [vendors, setVendors] = useState(null)

    useEffect(() => {
        loadVendors()
    }, [])

    const loadVendors = async () => {
        
        const users = await loadUsersByRole('vendor')
        setVendors(users)
    }
    
    return (
        <Screen
            titleComponent={<ScreenTitle title='Merchants' />}
        >
            <View
                style={{ display: vendors ? 'visible' : 'hidden' }}
            >
                {
                    vendors
                        ? <VendorList users={vendors} {...props} />
                        : <EmptyStatus status='No participating vendors.' />
                }

            </View>

        </Screen>
    )
}