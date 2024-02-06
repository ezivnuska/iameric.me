import React, { useContext } from 'react'
import {
    View,
} from 'react-native'
import {
    AuthMenu,
    Brand,
    CenteredContent,
    IconButton,
} from '.'
import { navigate } from '../navigators/RootNavigation'
import { useTheme } from 'react-native-paper'
import { PreferencesContext } from '../PreferencesContext'

export default () => {
    
    const {
        isThemeDark,
        toggleTheme,
    } = useContext(PreferencesContext)
    
    const theme = useTheme()
    
    return (
        <View
            style={{
                width: '100%'
            }}
        >
        
            <View
                style={{
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'stretch',
                    width: '100%',
                    height: 50,
                    minHeight: 50,
                    maxHeight: 50,
                }}
            >
                
                <View
                    style={{
                        flexBasis: 'auto',
                    }}
                >
                    <Brand onPress={toggleTheme} />
                </View>

                <View
                    style={{
                        flexBasis: 'auto',
                        display: 'flex',
                        flexDirection: 'row',
                    }}
                >
                    <IconButton
                        iconName={`${isThemeDark ? 'sunny' : 'moon'}-outline`}
                        onPress={toggleTheme}
                        transparent
                    />

                    <AuthMenu
                        onPress={() => navigate('Settings')}
                    />
                </View>
            </View>

        </View>
    )
}