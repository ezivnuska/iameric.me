import React from'react'
import { View } from'react-native'
import { FormHeader } from './components'
import {
    Heading,
    SimpleButton,
} from '@components'
import { useModal } from '@modal'

export default () => {
    const { setModal } = useModal()
    return (
        <View>
            
            <FormHeader title='Settings' />

            <View>
                <Heading title='Close Account' />
                <SimpleButton
                    label='Close Account'
                    onPress={() => setModal('DESTROY')}
                />
            </View>
            
        </View>
    )
}