import React from 'react'
import {
    FlatList,
    View,
} from 'react-native'
import {
    UserHeading,
} from '.'
// import { navigationRef } from '../navigators/RootNavigation'

export default ({ users, ...props }) => (
    <FlatList
        data={users}
        listKey={() => 'users'}
        keyExtractor={(item, index) => 'user' + index}
        renderItem={({ item }) => {
            const { _id, profileImage, username, token } = item
            return (
                <View
                    style={{
                        paddingTop: 7,
                        paddingBottom: 4,
                        paddingHorizontal: 10,
                        borderBottomWidth: 1,
                    }}
                >
                    <UserHeading
                        user={item}
                        filename={profileImage && profileImage.filename ? profileImage.filename : null}
                        onPress={() => props.navigation.navigate('Vendor', { id: _id })}
                    />
                </View>
            )
        }}
    />
)