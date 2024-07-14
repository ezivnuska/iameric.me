import React from 'react'
import { View } from 'react-native'
import { IconButton } from '@components'
import { navigate } from '@utils/navigation'

export default props => (
    <View
        style={{
            flexDirection: 'row',
            justofyContent: 'space-evenly',
            gap: 10,
        }}
    >

        <IconButton
            name='images-outline'
            onPress={() => navigate('Images')}
            disabled={props.route.name === 'Images'}
        />

    </View>
)