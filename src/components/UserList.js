import React from 'react'
import {
    FlatList,
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
            const { _id, profileImage, username } = item
            return (
                <UserHeading
                    username={username}
                    filename={profileImage && profileImage.filename ? profileImage.filename : null}
                    onPress={() => navigate('Details', { id: _id })}
                />
            )
        }} 
    />
)