import React, { useContext } from 'react'
import {
    Text,
    TouchableOpacity,
    // useColorScheme,
} from 'react-native'
import { useTheme } from 'react-native-paper'
import layout from '../styles/layout'
import { navigationRef } from 'src/navigation/RootNavigation'

export default () => {

    const theme = useTheme()
    
    return (
        <TouchableOpacity
            style={{
                flex: 1,
                flexGrow: 1,
                paddingHorizontal: 5,
                paddingVertical: 3,
            }}
            onPress={() => navigationRef.reset({
                index: 0,
                routes: [{ name: 'Vendors' }],
            })}
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