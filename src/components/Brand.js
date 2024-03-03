import React from 'react'
import {
    Pressable,
    Text,
    View,
} from 'react-native'
import { useTheme } from 'react-native-paper'
import { navigationRef } from 'src/navigation/RootNavigation'

export default () => {

    const theme = useTheme()
    
    return (
        <Pressable
            style={{
                flex: 1,
                flexGrow: 1,
                paddingHorizontal: 5,
                paddingVertical: 3,
            }}
            onPress={() => navigationRef.navigate('Tabs')}
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
        </Pressable>
    )
}