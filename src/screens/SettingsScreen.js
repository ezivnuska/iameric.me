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
    UserHeading,
} from '../components'
import { AppContext } from '../AppContext'

const SettingsScreen = ({ ...props }) => {

    const {
        user,
    } = useContext(AppContext)

    return (
        <View style={styles.container}>
            <View style={styles.heading}>
                <UserHeading user={user} />
            </View>
            <View style={styles.modules}>
                {
                    (user.role === 'vendor' || user.role === 'customer')
                        ? <LocationDisplay details={user.location} />
                        : null
                }

                <AvatarDisplay />

                <ProductDisplay user={user} />
                
            </View>
            
            {/*<DeleteAccountButton />*/}

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
    heading: {
        paddingHorizontal: 10,
        paddingVertical: 10,
    },
})