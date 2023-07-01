import React, { useContext, useEffect, useState } from 'react'
import {
    StyleSheet,
    View,
} from 'react-native'
import {
    AvatarModule,
    DeleteAccountButton,
    ImageList,
    ProductDisplay,
    Module,
} from '../components'
import { AppContext } from '../AppContext'
import AvatarDisplay from '../components/AvatarDisplay'

const SettingsScreen = ({ ...props }) => {

    const {
        dispatch,
        state,
    } = useContext(AppContext)

    const { user } = state
    useEffect(() => {
        console.log('---> user', user)
    }, [user])
    return (
        <View style={styles.container}>
            <View style={styles.modules}>
                {(user && user.role === 'vendor') && (
                    <Module title='Products'>
                        <ProductDisplay vendor={user} />
                    </Module>
                )}
                <Module title='Avatar'>
                    <AvatarDisplay />
                </Module>
            </View>
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