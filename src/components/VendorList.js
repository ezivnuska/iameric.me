import React, { useContext, useEffect } from 'react'
import {
    FlatList,
} from 'react-native'
import {
    UserListItem,
} from '.'
import { navigate } from '../navigators/RootNavigation'
import { AppContext } from '../AppContext'

const VendorList = () => {

    const {
        vendors,
    } = useContext(AppContext)

    useEffect(() => {
        console.log('vendors on load', vendors)
    }, [])

    const onPress = id => navigate('Details', { id })

    return (
        <FlatList
            data={vendors}
            listKey={() => 'vendors'}
            keyExtractor={item => 'vendor' + item._id}
            renderItem={({ item }) => (
                <UserListItem
                    user={item}
                    onPress={onPress}
                />
            )} 
        />
    )
}

export default VendorList