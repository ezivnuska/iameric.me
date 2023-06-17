import React from 'react'
import {
    StyleSheet,
    View,
} from 'react-native'
import {
    AvatarModule,
    DeleteAccountButton,
    ImageList,
    MenuList,
    MenuItemForm,
    Module,
} from '.'

const Settings = () => (
    <View style={styles.container}>
        <View style={styles.modules}>
            <Module>
                <View>
                    <MenuItemForm
                        addItem={() => console.log('addItem')}
                        updateStatus={() => console.log('updateStatus')}
                    />
                    <MenuList items={[{ _id: 1, title: 'one' }, { _id: 2, title: 'two' }]} />
                </View>
            </Module>
            <Module>
                <View>
                    <AvatarModule />
                    <ImageList />
                </View>
            </Module>
        </View>
        <Module>
            <DeleteAccountButton />
        </Module>
    </View>
)

export default Settings

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        flexDirection: 'column',
        flexWrap: 'wrap',
        justifyContent: 'flex-start',
        width: '100%',
        minWidth: 300,
        maxWidth: 900,
    },
    modules: {
        flex: 1,
        flexShrink: 1,
        flexGrow: 1,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'flex-start',
        flexWrap: 'wrap',
        width: '70%',
        minWidth: 300,
        maxWidth: 900,
    },
})