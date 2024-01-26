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
            
            return (
                <View
                    style={{
                        // paddingTop: 7,
                        // paddingBottom: 4,
                        borderBottomWidth: 1,
                        borderBottomColor: '#333',
                        marginBottom: 10,
                    }}
                >
                    <UserHeading
                        user={item}
                        filename={profileImage && profileImage.filename ? profileImage.filename : null}
                        onPress={() => navigate('User', { id: _id })}
                    />
                </View>
            )
        }} 
    />
)