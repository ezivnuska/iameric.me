import React, { useMemo } from 'react'
import { FlatList } from 'react-native'
import { VendorListItem } from './components'
import {
    useContacts,
} from '@context'
import { navigationRef } from '@utils/navigate'

export default ({ disabled = false }) => {
    const {
        contacts,
    } = useContacts()

    const vendors = useMemo(() => contacts.filter(user => user.fiction === true), [contacts])

    return (
        <FlatList
            data={vendors}
            listKey={() => 'vendors'}
            keyExtractor={(item, index) => 'vendor' + index}
            renderItem={({ item }) => {
                return (
                    <VendorListItem
                        user={item}
                        filename={item.profileImage?.filename}
                        onPress={() => navigationRef.navigate('Vendors', { screen: 'Vendor', params: { id: item._id } })}
                        style={{ alignItems: 'center' }}
                        disabled={disabled}
                    />
                )
            }}
        />
    )
} 