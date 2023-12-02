import React from 'react'
import {
    Text,
    View,
} from 'react-native'
import {
    UserHeading,
} from '.'
import main from '../styles/main'

export default ({ user }) => {
    return (
        <View>
            <UserHeading
                online={!!user.token}
                username={user.username}
                filename={user.profileImage && user.profileImage.filename ? user.profileImage.filename : null}
            />
            
            <View style={{ marginVertical: 5 }}>
                <Text style={main.text}>Role: {user.role}</Text>
            </View>
        </View>
    )
}