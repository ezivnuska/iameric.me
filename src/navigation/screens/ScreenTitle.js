import React, { useContext } from 'react'
import {
    View,
} from 'react-native'
import {
    ThemedText,
} from '@components'
import classes from '@styles/classes'
import { useTheme } from 'react-native-paper'
import { AppContext } from '../../AppContext'

export default ({ children, title = null }) => {

    const {
        isLandscape,
    } = useContext(AppContext)
    
    const theme = useTheme()
    
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
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    width: '100%',
                    maxWidth: isLandscape ? 900 : 600,
                    marginHorizontal: 'auto',
                    paddingHorizontal: 10,
                    marginVertical: 0,
                }}
            >
                <ThemedText
                    style={[
                        classes.pageTitle,
                        {
                            flexBasis: 'auto',
                            flexGrow: 1,
                            color: theme?.colors.headerPrimary,
                            lineHeight: 30,
                            marginTop: 5,
                            marginBottom: 5,
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