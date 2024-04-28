import React, { useEffect, useState } from 'react'
import {
    View,
} from 'react-native'
import {
    TitleBar,
    VendorList,
} from '@components'
import {
    useContacts,
} from '@context'
import { loadVendors } from '@utils/contacts'

export default props => {

    const { setContactsLoading } = useContacts()

    const [vendors, setVendors] = useState(null)
    
    useEffect(() => {
        const init = async () => {
            setContactsLoading(true)
            const loadedVendors = await loadVendors()
            setContactsLoading(false)
            setVendors(loadedVendors)
        }
        init()
    }, [])

    return (
        <View>
            <TitleBar title='Vendors' />
            <VendorList users={vendors} {...props} />
        </View>
    )
} 