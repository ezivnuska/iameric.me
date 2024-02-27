import React, { useContext } from 'react'
import {
    Text,
    TouchableOpacity,
    View,
} from 'react-native'
import { useTheme } from 'react-native-paper'
import { navigationRef } from 'src/navigation/RootNavigation'
import { AppContext } from '../AppContext'

export default () => {

    const theme = useTheme()

    const {
        user,
    } = useContext(AppContext)

    const navigateToInitialRoute = () => {
        if (!user) navigationRef.navigate('Start')
        else {
            switch(user.role) {
                case 'admin': navigationRef.navigate('Forum'); break
                case 'customer': navigationRef.navigate('Vendors'); break
                case 'driver': navigationRef.navigate('Orders'); break
                case 'vendor': navigationRef.navigate('Products'); break
            }
        }
    }
    
    return (
        <TouchableOpacity
            style={{
                flex: 1,
                flexGrow: 1,
                paddingHorizontal: 5,
                paddingVertical: 3,
            }}
            onPress={() => navigateToInitialRoute()}
        >
            <View
                style={{
                    flexDirection: 'row',
                    justifyContent: 'flex-start',
                    flexWrap: 'wrap',
                    alignItems: 'baseline',
                    flexShrink: 1,
                    height: 30,
                    overflow: 'hidden',
                }}
            >

                <Text
                    style={{
                        flexBasis: 'auto',
                        flexShrink: 0,
                        fontSize: 26,
                        lineHeight: 30,
                        fontWeight: 700,
                        color: theme?.colors.brandLight,
                    }}
                >
                    iam
                </Text>

                <Text
                    style={{
                        flexBasis: 'auto',
                        flexShrink: 0,
                        fontSize: 26,
                        lineHeight: 30,
                        fontWeight: 700,
                        color: theme?.colors.brandDark,
                    }}
                >
                    eric
                </Text>

            </View>
        </TouchableOpacity>
    )
}