import React from 'react'
import { View } from 'react-native'
import {
    Cabinet,
    Screen,
    SimpleButton,
    ThemedText,
} from '@components'
import { useApp } from '@app'
import { useModal } from '@modal'

export default props => {
    // console.log('check out available props from navigation container...', props)
    // we are using the navigate method below.

    const { user } = useApp()
    const { setModal } = useModal()
    
    return (
        <Screen {...props}>

            <View
                style={{
                    flexGrow: 1,
                    justifyContent: 'space-between',
                    gap: 20,
                }}
            >
                <View style={{ flexGrow: 1 }}>
                    
                    <ThemedText bold size={20}>
                        {user && user.username}
                    </ThemedText>
                    
                    <Cabinet
                        title='Account'
                    >
                        <SimpleButton
                            label='Close Account'
                            onPress={() => setModal('DESTROY')}
                        />
                    </Cabinet>

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