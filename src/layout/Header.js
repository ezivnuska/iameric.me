import React, { useContext } from 'react'
import {
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

export default ({ user, size }) => {
    
    const {
        isThemeDark,
        toggleTheme,
    } = useContext(PreferencesContext)
    
    const theme = useTheme()
    
    return (
        <View
            style={{
                width: '100%',
                minWidth: 300,
                // maxWidth: 6000,
                marginHorizontal: 'auto',
            }}
        >
        
            <View
                style={{
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    width: '100%',
                    height: 50,
                    minHeight: 50,
                    maxHeight: 50
                }}
            >
                <Brand onPress={toggleTheme} />

                <ThemedText>{size.width}, {size.height}</ThemedText>

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

        </View>
    )
}