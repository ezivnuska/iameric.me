import React, { useContext, useEffect, useState } from 'react'
import {
    StyleSheet,
    View,
} from 'react-native'
import {
    // AvatarModule,
    AvatarDisplay,
    DeleteAccountButton,
    // ImageList,
    ProductDisplay,
    Module,
    LocationDisplay,
} from '../components'
import { AppContext } from '../AppContext'

const SettingsScreen = ({ ...props }) => {

    const {
        dispatch,
        state,
    } = useContext(AppContext)

    const { user } = state

    const renderProducts = () => (
        <Module title='Products'>
            <ProductDisplay vendor={user} />
        </Module>
    )
    const renderLocation = () => (
        <Module title='Location'>
            <LocationDisplay user={user} />
        </Module>
    )
    const renderModules = () => user ? (
        <View style={styles.modules}>
            {(user.role === 'vendor' || user.role === 'customer')
                ? renderLocation() : null}
            {(user.role === 'vendor') ? renderProducts() : null}
            <Module title='Avatar'>
                <AvatarDisplay />
            </Module>
        </View>
    ) : null

    return (
        <View style={styles.container}>
            {renderModules()}
            <Module>
                <DeleteAccountButton />
            </Module>
        </View>
    )
}

export default SettingsScreen

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'flex-start',
        flexWrap: 'wrap',
    },
    modules: {
        flex: 1,
        flexShrink: 1,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'flex-start',
        flexWrap: 'wrap',
        width: 550,
        minWidth: '70%',
        maxWidth: 900,
    },
})