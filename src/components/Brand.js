import React, { useContext } from 'react'
import {
    Text,
    TouchableOpacity,
    // useColorScheme,
} from 'react-native'
import { useTheme } from 'react-native-paper'
import layout from '../styles/layout'

export default ({ onPress }) => {

    const theme = useTheme()
    
    return (
        <TouchableOpacity
            style={{
                flex: 1,
                paddingHorizontal: 5,
                paddingVertical: 3,
                minWidth: 120,
            }}
            onPress={onPress}
        >
            <Text style={{
                lineHeight: 26,
                fontSize: 26,
                fontWeight: 700,
                color: theme?.colors.brandLight,
                flexShrink: 0,
            }}>
                iam
                <Text style={{ color: theme?.colors.brandDark }}>
                    eric
                </Text>
            </Text>
        </TouchableOpacity>
    )
}