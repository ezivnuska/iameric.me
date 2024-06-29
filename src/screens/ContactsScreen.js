import React from 'react'
import { View } from 'react-native'
import {
    Contacts,
    Screen,
    SimpleButton,
    ThemedText,
} from '@components'
import { useSocket } from '@socket'

export default props => {

    const {
        connections,
    } = useSocket()
    
    return (
        <Screen title='Contacts' {...props}>
            
            <View
                style={{
                    flexGrow: 1,
                    justifyContent: 'space-between',
                    gap: 20,
                }}
            >
                <View style={{ flexGrow: 1 }}>
                    {connections && connections.length && <Contacts contacts={connections} />}
                </View>

                <View style={{ flexGrow: 0 }}>
                    <SimpleButton
                        label='Go Back'
                        onPress={() => props.navigation.navigate('Home')}
                    />
                </View>
            </View>

        </Screen>
    )
}