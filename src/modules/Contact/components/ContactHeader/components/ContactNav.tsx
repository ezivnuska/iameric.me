import React from 'react'
import { View } from 'react-native'
import { IconButton } from '@components'

export default (toggle, visible, ...props) => (
    <View
        style={{
            flexDirection: 'row',
            justifyContent: 'space-evenly',
            gap: 10,
        }}
    >

        <IconButton
            name='@images-outline'
            onPress={toggle}
            disabled={visible}
            // onPress={() => props.navigation.navigate('@images')}
        />

    </View>
)