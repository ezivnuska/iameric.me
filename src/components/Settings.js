import React from 'react'
import {
    View,
} from 'react-native-web'
import {
    AvatarModule,
    DeleteAccountButton,
    ImageList,
    Profile,
} from '.'

const Settings = () => (
    <View>
        <Profile />
        <AvatarModule />
        <ImageList />
        <DeleteAccountButton />
    </View>
)

export default Settings