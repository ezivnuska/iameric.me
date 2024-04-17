import React from 'react'
import {
    FlatList,
    View,
} from 'react-native'
import {
    UserHeading,
} from '.'

export default ({ users, ...props }) => (
    <FlatList
        data={users}
        listKey={() => 'users'}
        keyExtractor={(item, index) => 'user' + index}
        renderItem={({ item }) => {
            const { _id, profileImage } = item
            const { filename } = item
            return (
                <View
                    style={{
                        paddingVertical: 10,
                    }}
                >
                    <UserHeading
                        user={item}
                        filename={profileImage && filename ? filename : null}
                        onPress={() => props.navigation.navigate('Vendor', { id: _id })}
                        style={{ alignItems: 'center' }}
                    />
                </View>
            )
        }}
    />
)