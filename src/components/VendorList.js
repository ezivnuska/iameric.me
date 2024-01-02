import React from 'react'
import {
    FlatList,
    View,
} from 'react-native'
import {
    UserHeading,
} from '.'
import { navigate } from '../navigators/RootNavigation'

export default ({ users }) => (
    <FlatList
        data={users}
        listKey={() => 'users'}
        keyExtractor={(item, index) => 'user' + index}
        renderItem={({ item }) => {
            const { _id, profileImage, username, token } = item
            const online = !!token
            return (
                <View
                    style={{
                        paddingTop: 7,
                        paddingBottom: 4,
                        borderBottomWidth: 1,
                    }}
                >
                    <UserHeading
                        online={online}
                        username={username}
                        filename={profileImage && profileImage.filename ? profileImage.filename : null}
                        onPress={() => navigate('Vendor', { id: _id })}
                    />
                </View>
            )
        }} 
    />
)