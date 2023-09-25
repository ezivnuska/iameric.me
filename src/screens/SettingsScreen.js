import React, {
    useContext,
    useEffect,
    // useState,
} from 'react'
import {
    StyleSheet,
    View,
} from 'react-native'
import {
    // AvatarModule,
    AvatarDisplay,
    // DeleteAccountButton,
    // ImageList,
    // ProductDisplay,
    // Module,
    LocationDisplay,
    // UserHeading,
    Screen,
} from '../components'
import { AppContext } from '../AppContext'
import { navigate } from '../navigators/RootNavigation'

const SettingsScreen = () => {

    const {
        user,
    } = useContext(AppContext)

    // useEffect(() => {
    //     console.log('user---->', user)
    //     if (!user) {
    //         console.log('no user')
    //         navigate('Start')
    //     }
    // }, [])

    return (
        <Screen>

            <View style={styles.modules}>
                {
                    (user.role === 'vendor' || user.role === 'customer')
                        ? <LocationDisplay details={user.location} />
                        : null
                }

                <AvatarDisplay />
                
            </View>
            
            {/*<DeleteAccountButton />*/}

        </Screen>
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