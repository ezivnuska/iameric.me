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

    const renderDims = () => {
        let showDims = false
        let showFull = false
        if ((dims.width >= 300 && dims.width < 350) || dims.width >= 400) showFull = true
        if (dims.width >= 350) showDims = true
        return (
            <ThemedText style={{ fontSize: 14 }}>
                {showFull
                    ? orientation === 'portrait'
                        ? 'portrait'
                        : 'landscape'
                    : orientation === 'portrait'
                        ? 'P'
                        : 'L'
                }
                {showDims && ` ${dims.width}x${dims.height}`}
            </ThemedText>
        )
    }
    
    return (
        <View
            style={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'flex-end',
                width: '100%',
                minWidth: 280,
                marginHorizontal: 'auto',
                height: 50,
                minHeight: 50,
                maxHeight: 50,
                paddingBottom: 10,
            }}
        >
            <Brand onPress={toggleTheme} />

            {renderDims()}

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
                    styles={{ paddingVertical: 3 }}
                    // padded={false}
                />

                <AuthMenu user={user} />
            </View>
        </View>
    )
}