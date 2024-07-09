import React from 'react'
import { View } from 'react-native'
import {
    Cabinet,
    Screen,
    SimpleButton,
} from '@components'
import { useApp } from '@app'
import { useModal } from '@modal'

export default props => {
    // console.log('check out available props from navigation container...', props)
    // we are using the navigate method below.

    const { user } = useApp()
    const { setModal } = useModal()
    
    return (
        <Screen
            {...props}
            title={user ? user.username : null}
        >

            <View
                style={{
                    flexGrow: 1,
                    justifyContent: 'space-between',
                    gap: 20,
                }}
            >
                <View style={{ flexGrow: 1 }}>
                    
                    <Cabinet title='Close Account'>

                        <SimpleButton
                            label='Close Account'
                            onPress={() => setModal('DESTROY')}
                        />

                    </Cabinet>

                </View>
            
            </View>

        </Screen>
    )
}