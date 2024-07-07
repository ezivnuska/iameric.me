import React from 'react'
import { View } from 'react-native'
import {
    Cabinet,
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
            title='Home'
        >
            <View
                style={{
                    flexGrow: 1,
                    justifyContent: 'space-between',
                    gap: 20,
                }}
            >

                <View style={{ flexGrow: 1 }}>

                    <Cabinet
                        title='Socket Details'
                        closed={false}
                    >
                        <Socket />
                    </Cabinet>

                </View>

                <View
                    style={{
                        flexGrow: 0,
                        flexDirection: 'row',
                        justifyContent: 'space-evenly',
                        gap: 10,
                    }}
                >
                    <SimpleButton
                        label='Contacts'
                        onPress={() => props.navigation.navigate('Contacts')}
                        disabled={!user}
                        style={{ flexGrow: 1 }}
                    />

                    <SimpleButton
                        label='Forum'
                        onPress={() => props.navigation.navigate('Forum')}
                        disabled={!user}
                        style={{ flexGrow: 1 }}
                    />

                    <SimpleButton
                        label='Mail'
                        onPress={() => props.navigation.navigate('Mail')}
                        disabled={!user}
                        style={{ flexGrow: 1 }}
                    />
                    
                </View>
            </View>
            

        </Screen>
    )
}