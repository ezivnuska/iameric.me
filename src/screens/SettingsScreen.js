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

    const renderModules = () => user ? (
        <View style={styles.modules}>
            
            {(user.role === 'vendor' || user.role === 'customer')
                ? <LocationDisplay user={user} />
                : null}

            {(user.role === 'vendor')
                ? <ProductDisplay vendor={user} />
                : null}

            <AvatarDisplay />
            
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
        flexGrow: 0,
        flexShrink: 1,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'flex-start',
        flexWrap: 'wrap',
        width: 350,
        minWidth: 350,
        maxWidth: 900,
    },
})