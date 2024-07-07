import React from 'react'
import { View } from 'react-native'
import {
    Screen,
    SimpleButton,
    ThemedText,
} from '@components'
import { DestroyForm } from '@forms'
import { useApp } from '@app'

export default props => {
    // console.log('check out available props from navigation container...', props)
    // we are using the navigate method below.

    const { user } = useApp()
    
    return (
        <Screen
            {...props}
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
                    
                    <ThemedText>
                        {user && user.username}
                    </ThemedText>
                    
                    <DestroyForm />

                </View>

                <View style={{ flexGrow: 0 }}>
                    <SimpleButton
                        label='Home'
                        onPress={() => props.navigation.navigate('Home')}
                    />
                </View>
            </View>
            

        </Screen>
    )
}