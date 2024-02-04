import React, { useContext, useEffect } from 'react'
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
        <CenteredContent type='full' style={{ backgroundColor: theme?.colors.headerBackground }}>
            
            <View
                style={{
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'stretch',
                    width: '100%',
                    minWidth: 300,
                    maxWidth: 900,
                    marginHorizontal: 'auto',
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
                    />

                    <AuthMenu
                        onPress={() => navigate('Settings')}
                    />
                </View>
            </View>

        </CenteredContent>
    )
}