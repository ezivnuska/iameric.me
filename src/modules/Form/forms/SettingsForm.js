import React from'react'
import { View } from'react-native'
import { FormHeader } from './components'
import {
    Heading,
    SimpleButton,
} from '@components'
import { useModal } from '@modal'
import { navigate } from '@utils/navigation'

const SettingsForm = () => {
    
    const { setModal } = useModal()
    
    const handleSignout = () => {
        navigate('Home', { signout: true })
    }

    return (
        <View
            style={{
                flex: 1,
            }}
            >
            
            <FormHeader title='Settings' />

            <View
                style={{
                    flex: 1,
                    gap: 50,
                    // justifyContent: 'space-evenly',
                }}
            >

                <View
                    // style={{
                    //     flexDirection: 'row',
                    //     justifyContent: 'space-evenly',
                    // }}
                >
                    <View style={{ flex: 1 }}>
                        <Heading title='Sign Out' />
                    </View>
                    <View style={{ flex: 1 }}>
                        <SimpleButton
                            label={'Sign Out'}
                            onPress={() => handleSignout()}
                        />
                    </View>
                </View>
                
                <View
                    // style={{
                    //     flexDirection: 'row',
                    //     justifyContent: 'space-evenly',
                    // }}
                >
                    <View style={{ flex: 1 }}>
                        <Heading title='Close Account' />
                    </View>
                    <View style={{ flex: 1 }}>
                        <SimpleButton
                            label='Close Account'
                            onPress={() => setModal('DESTROY')}
                        />
                    </View>
                </View>

            </View>
            
        </View>
    )
}

export default SettingsForm