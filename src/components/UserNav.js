import React from 'react'
import { View } from 'react-native'
import { IconButton } from '@components'

export default props => (
    <View
        style={{
            flexShrink: 1,
            flexDirection: 'row',
            justifyContent: 'space-evenly',
            gap: 10,
        }}
    >

        <IconButton
            name='images-outline'
            onPress={() => props.navigation.navigate('Images')}
            disabled={props.route.name === 'Images'}
        />

    </View>
)