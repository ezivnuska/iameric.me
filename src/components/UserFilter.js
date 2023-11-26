import React, { useEffect, useState } from 'react'
import {
    FlatList,
    Pressable,
    Text,
    View,
} from 'react-native'
import { UserHeading } from '.'
import { navigate } from '../navigators/RootNavigation'

const UserFilterListItem = ({ user }) => (
    <Pressable
        onPress={() => navigate('Details', { id: user._id })}
        style={{
            paddingTop: 3,
            paddingBottom: 5,
            marginBottom: 5,
            borderBottomWidth: 1
        }}
    >
        <UserHeading
            filename={(user.profileImage && user.profileImage.filename) ? user.profileImage.filename : null}
            username={user.username}
            onPress={() => navigate('Details', { id: user._id })}
        />
    </Pressable>
)

const FilterButton = ({ active, label, press, type }) => (
    <Pressable
        onPress={() => press(type)}
        style={{ flex: 1 }}
    >
        <Text style={{
            paddingVertical: 10,
            textAlign: 'center',
            backgroundColor: active ? '#0af' : '#fff'
        }}>{label}</Text>
    </Pressable>
)

export default ({ users, role = null }) => {

    const [type, setType] = useState(role)
    const [listItems, setListItems] = useState(users)

    useEffect(() => {
        if (!listItems) setListItems(users)
    }, [])

    // useEffect(() => {
    //     console.log('listItems:', listItems)
    // }, [listItems])

    useEffect(() => {
        if (type) filterUsersByType()
        else setListItems(users)
    }, [type])

    const filterUsersByType = () => {
        const filteredUsers = users.filter(user => user.role === type)
        setListItems(filteredUsers)
    }
    
    const handlePress = listType => {
        if (type === listType) setType(null)
        else setType(listType)
    }

    const renderFilterButtons = () => (
        <View
            style={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'stretch',
            }}
        >
            <FilterButton
                active={type === 'customer'}
                label={'Customers'}
                press={() => handlePress('customer')}
                type={'customer'}
            />

            <FilterButton
                active={type === 'vendor'}
                label={'Vendors'}
                press={() => handlePress('vendor')}
                type={'vendor'}
            />
            
            <FilterButton
                active={type === 'driver'}
                label={'Drivers'}
                press={() => handlePress('driver')}
                type={'driver'}
            />
            
        </View>
    )

    return (
        <View>
            
            {renderFilterButtons()}

            <FlatList
                data={listItems}
                listKey={() => 'user-filter'}
                keyExtractor={item => 'user-filter-item-' + item._id}
                renderItem={({ item }) => <UserFilterListItem user={item} />} 
            />
            
        </View>
    )
}