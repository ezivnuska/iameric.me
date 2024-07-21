import React from'react'
import { View } from'react-native'
import { FormHeader } from './components'
import {
    Heading,
    SimpleButton,
} from '@components'
import { useModal } from '@modal'
import { navigate } from '@utils/navigation'

export default () => {
    
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
                    justifyContent: 'space-evenly',
                }}
            >

                <View>
                    <Heading title='Sign Out' />
                    <SimpleButton
                        label={'Sign Out'}
                        onPress={() => handleSignout()}
                    />
                </View>
                
                <View>
                    <Heading title='Close Account' />
                    <SimpleButton
                        label='Close Account'
                        onPress={() => setModal('DESTROY')}
                    />
                </View>

            </View>
            
        </View>
    )
}