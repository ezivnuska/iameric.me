import React from 'react'
import { View } from 'react-native'
import {
    AuthView,
    Screen,
    SimpleButton,
    Socket,
} from '@components'
import { useApp } from '@app'

export default props => {
    // console.log('check out available props from navigation container...', props)
    // we are using the navigate method below.

    const { user } = useApp()
    
    return (
        <Screen
            {...props}
            secure={false}
            // title='Home'
        >
            <View
                style={{
                    flexGrow: 1,
                    justifyContent: 'space-between',
                    gap: 20,
                }}
            >

                <View style={{ flexGrow: 1 }}>
                    
                    <Socket />
                    
                    {!user && <AuthView />}

                </View>

                <View style={{ flexGrow: 0 }}>
                    <SimpleButton
                        label='Contacts'
                        onPress={() => props.navigation.navigate('Contacts')}
                        disabled={!user}
                    />
                </View>
            </View>
            

        </Screen>
    )
}