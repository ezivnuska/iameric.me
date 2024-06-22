import React, { useEffect } from 'react'
import {
    Text,
    View,
} from 'react-native'
import { useApp } from '@context'
import { classes } from '@styles'

export default ({ location }) => {

    const { theme } = useApp()
    
    if (!location) return null

    const { address1, address2, city, state, zip } = location
    
    return (
        <View>
            
            <Text
                style={[
                    classes.textSmaller,
                    { color: theme?.colors.textDefault },
                ]}
            >
                {address1}{(address2 && address2.length) ? `, ${address2}` : null}
            </Text>

            <Text
                style={[
                    classes.textSmaller,
                    { color: theme?.colors.textDefault },
                ]}
            >
                {`${city}, ${state} ${zip}`}
            </Text>

        </View>
    )
}