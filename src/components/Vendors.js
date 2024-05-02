import React, { useEffect, useState } from 'react'
import {
    FlatList,
    View,
} from 'react-native'
import {
    ScreenContent,
    TitleBar,
    UserHeading,
} from '@components'
import {
    useContacts,
} from '@context'
import { loadVendors } from '@utils/contacts'

export default ({ navigation }) => {

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
            <ScreenContent>
                <FlatList
                    data={vendors}
                    listKey={() => 'vendors'}
                    keyExtractor={(item, index) => 'vendor' + index}
                    renderItem={({ item }) => {
                        const { _id, profileImage } = item
                        const { filename } = profileImage
                        return (
                            <UserHeading
                                user={item}
                                filename={filename}
                                onPress={() => navigation.navigate('Vendor', { id: _id })}
                                style={{ alignItems: 'center' }}
                            />
                        )
                    }}
                />
            </ScreenContent>
        </View>
    )
} 