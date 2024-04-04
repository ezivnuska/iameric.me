import React, { useContext } from 'react'
import {
    Pressable,
    View,
} from 'react-native'
import {
    ThemedText,
} from '@components'
import classes from '@styles/classes'
import { AppContext, useApp } from '@context'
import { StackActions } from '@react-navigation/native'

export default ({ children, navigation = null, backLabel = null, title = null }) => {

    const {
        isLandscape,
    } = useContext(AppContext)
    
    const { theme } = useApp()
    
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
                            // marginTop: 5,
                            // marginBottom: 5,
                        }}
                    >
                        <ThemedText
                            style={[
                                classes.pageTitle,
                                {
                                    color: theme?.colors.headerPrimary,
                                    // lineHeight: 30,
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
                            // lineHeight: 30,
                            // marginTop: 5,
                            // marginBottom: 5,
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