import React, { useContext } from 'react'
import {
    Text,
    TouchableOpacity,
    useColorScheme,
} from 'react-native'
import { useTheme } from 'react-native-paper'
import layout from '../styles/layout'
import { AppContext } from '../AppContext'

export default ({ onPress }) => {

    const {
        theme,
        toggleTheme,
    } = useContext(AppContext)

    const colors = useTheme()
    
    return (
        <TouchableOpacity
            style={{ paddingHorizontal: layout.horizontalPadding }}
            onPress={onPress}
        >
            <Text style={{
                lineHeight: 45,
                fontSize: 25,
                fontWeight: 700,
                color: colors.brandLight,
            }}>
                iam
                <Text style={{ color: theme?.colors.brandDark }}>
                    eric
                </Text>
            </Text>
        </TouchableOpacity>
    )
}