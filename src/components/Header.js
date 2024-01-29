import React, { useContext } from 'react'
import {
    View,
} from 'react-native'
import {
    AuthMenu,
    Brand,
    CenteredContent,
} from '.'
import { navigate } from '../navigators/RootNavigation'
import { useTheme } from 'react-native-paper'
import { PreferencesContext } from '../PreferencesContext'

export default () => {
    
    const {
        toggleTheme,
        isThemeDark,
    } = useContext(PreferencesContext)
    
    const theme = useTheme()

    const onBrandClicked = () => {
        console.log('brandClicked')
        toggleTheme()
        // if (user) navigate('Private', { screen: 'Orders' })
        // else navigate('Start')
    }
    
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
                    <Brand onPress={onBrandClicked} />
                </View>

                <View
                    style={{
                        flexBasis: 'auto',
                    }}
                >
                    <AuthMenu
                        onPress={() => navigate('Settings')}
                    />
                </View>
            </View>

        </CenteredContent>
    )
}