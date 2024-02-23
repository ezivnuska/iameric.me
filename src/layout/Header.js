import React, { useContext } from 'react'
import {
    useWindowDimensions,
    View,
} from 'react-native'
import {
    AuthMenu,
    Brand,
    IconButton,
    ThemedText,
} from '../components'
import { useTheme } from 'react-native-paper'
import { PreferencesContext } from '../PreferencesContext'

export default ({ user, size, orientation }) => {
    
    const {
        isThemeDark,
        toggleTheme,
    } = useContext(PreferencesContext)
    
    const theme = useTheme()

    const dims = useWindowDimensions()
    
    return (
        <View
            style={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                width: '100%',
                minWidth: 280,
                marginHorizontal: 'auto',
                height: 50,
                minHeight: 50,
                maxHeight: 50
            }}
        >
            <Brand onPress={toggleTheme} />

            {dims.width >= 300 && <ThemedText>{dims.width}, {dims.height}, {orientation}</ThemedText>}

            <View
                style={{
                    flexBasis: 'auto',
                    display: 'flex',
                    flexDirection: 'row',
                    alignItems: 'center',
                }}
            >
                <IconButton
                    iconName={`${isThemeDark ? 'sunny' : 'moon'}-outline`}
                    onPress={toggleTheme}
                    transparent
                    textStyles={{ color: theme?.colors.textDefault }}
                />

                <AuthMenu user={user} />
            </View>
        </View>
    )
}