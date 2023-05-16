import React from 'react'
import {
    View,
} from 'react-native-web'
import {
    AvatarModule,
    ImageList,
    Profile,
} from '.'

const Settings = () => (
    <View>
        <Profile />
        <AvatarModule />
        <ImageList />
    </View>
)

export default Settings