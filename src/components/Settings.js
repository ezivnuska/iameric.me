import React from 'react'
import {
    View,
} from 'react-native'
import {
    AvatarModule,
    DeleteAccountButton,
    ImageList,
    MenuList,
    Profile,
} from '.'
import MenuItemForm from './MenuItemForm'

const Settings = () => (
    <View>
        <Profile />
        <MenuItemForm
            addItem={() => console.log('addItem')}
            updateStatus={() => console.log('updateStatus')}
        />
        <MenuList items={[{ _id: 1, title: 'one' }, { _id: 2, title: 'two' }]} />
        <AvatarModule />
        <ImageList />
        <DeleteAccountButton />
    </View>
)

export default Settings