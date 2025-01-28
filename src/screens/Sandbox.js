import React, { useEffect, useState } from 'react'
import { Screen } from './components'
import { List } from 'react-native-paper'

const Sandbox = props => {

    return (
        <Screen secure {...props}>
            <List.Item
                title="First Item"
                description="Item description"
                left={listProps => <List.Icon {...listProps} icon="folder" />}
            />
            <List.Item
                title="Second Item"
                description="Item description"
                left={listProps => <List.Icon {...listProps} icon="folder" />}
            />
            <List.Item
                title="Third Item"
                description="Item description"
                left={listProps => <List.Icon {...listProps} icon="folder" />}
            />
            <List.Item
                title="Fourth Item"
                description="Item description"
                left={listProps => <List.Icon {...listProps} icon="folder" />}
            />
            <List.Item
                title="Fifth Item"
                description="Item description"
                left={listProps => <List.Icon {...listProps} icon="folder" />}
            />
            <List.Item
                title="Sixth Item"
                description="Item description"
                left={listProps => <List.Icon {...listProps} icon="folder" />}
            />
        </Screen>
    )
}

export default Sandbox