import React from 'react'
import {
    FlatList,
    View,
} from 'react-native'
import {
    UserHeading,
} from '.'
import { navigationRef } from '../navigation/RootNavigation'

export default ({ users, onPress }) => (
    <FlatList
        data={users}
        listKey={() => 'users'}
        keyExtractor={(item, index) => 'user' + index}
        renderItem={({ item }) => {
            const { _id, profileImage, username, token } = item
            
            return (
                <View
                    style={{
                        marginBottom: 10,
                        paddingHorizontal: 10,
                    }}
                >
                    <UserHeading
                        user={item}
                        filename={profileImage && profileImage.filename ? profileImage.filename : null}
                        onPress={() => onPress(item)}
                        style={{ alignItems: 'center' }}
                    />
                </View>
            )
        }} 
    />
)