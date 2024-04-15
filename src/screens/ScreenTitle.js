import React from 'react'
import {
    Pressable,
    View,
} from 'react-native'
import {
    ThemedText,
} from '@components'
import classes from '@styles/classes'
import { useApp } from '@context'
import { StackActions } from '@react-navigation/native'

export default ({ children, navigation = null, backLabel = null, title = null }) => {
    
    const { isLandscape, theme } = useApp()
    
    return (
        <View
            style={{
                width: '100%',
                backgroundColor: theme?.colors.screenTitleBackground,
            }}
        >
            <View
                style={{
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: backLabel ? 'flex-start' : 'space-between',
                    alignItems: 'center',
                    width: '100%',
                    maxWidth: isLandscape ? 900 : 600,
                    marginHorizontal: 'auto',
                    paddingHorizontal: 10,
                    marginVertical: 0,
                }}
            >
                {backLabel && (
                    <Pressable
                        onPress={() => {
                            const popAction = StackActions.replace('UserList')
                            navigation.dispatch(popAction)
                        }}
                        style={{
                            flexBasis: 'auto',
                            flexGrow: 0,
                        }}
                    >
                        <ThemedText
                            style={[
                                classes.pageTitle,
                                {
                                    color: theme?.colors.headerPrimary,
                                    marginRight: 5,
                                },
                            ]}
                        >
                            {backLabel}:
                        </ThemedText>
                    </Pressable>
                )}

                <ThemedText
                    style={[
                        classes.pageTitle,
                        {
                            flexBasis: 'auto',
                            flexGrow: 1,
                            color: theme?.colors.headerPrimary,
                        },
                    ]}
                >
                    {title}
                </ThemedText>

                <View
                    style={{
                        flexBasis: 'auto',
                        flexGrow: 0,
                    }}
                >
                    {children}
                </View>

            </View>

        </View>
    )
}