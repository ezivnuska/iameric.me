import React, { useEffect, useState } from 'react'
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
        const vendors = await loadUsersByRole('vendor')
        setVendors(vendors)
    }
    
    return (
        <Screen
            titleComponent={<ScreenTitle title='Merchants' />}
        >
            {vendors
                ? <VendorList users={vendors} {...props} />
                : <EmptyStatus status='No participating vendors.' />
            }

        </Screen>
    )
}