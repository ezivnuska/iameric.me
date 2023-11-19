import React, { useContext, useEffect, useState } from 'react'
import {
    FlatList,
    Pressable,
    Text,
    View,
} from 'react-native'
import { UserHeading } from '.'
import { navigate } from '../navigators/RootNavigation'
import { AppContext } from '../AppContext'

const UserFilterListItem = ({ user }) => (
    <Pressable
        onPress={() => navigate('Details', { id: user._id })}
        style={{ borderBottomWidth: 1 }}
    >
        <UserHeading user={user} />
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

export default ({ users }) => {

    const {
        customers,
    } = useContext(AppContext)

    return (
        <View>

            <FlatList
                data={customers}
                listKey={() => 'customer-list'}
                keyExtractor={item => 'customer-list-item-' + item._id}
                renderItem={({ item }) => <UserFilterListItem user={item} />} 
            />
            
        </View>
    )
}