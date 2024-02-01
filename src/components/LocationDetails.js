import React from 'react'
import {
    Text,
    View,
} from 'react-native'
import classes from '../styles/classes'
import { useTheme } from 'react-native-paper'

export default ({ location }) => {

    const theme = useTheme()
    
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
                {address1}{address2.length ? `, ${address2}` : null}
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