import React, { useContext } from 'react'
import {
    ScrollView,
    useWindowDimensions,
    View,
} from 'react-native'
import {
    ThemedText,
} from '@components'
import { AppContext } from '../../AppContext'
import classes from '@styles/classes'
import { useTheme } from '@react-navigation/native'

export default ({ children, title = null, secure = true, tabs = true, padded = true }) => {

    const {
        user,
    } = useContext(AppContext)
    
    const theme = useTheme()

    const dims = useWindowDimensions()

    return (
        <View
            style={[
                {
                    alignItems: 'flex-start',
                    height: dims.height - 50,
                    backgroundColor: theme?.colors.background,
                },
            ]}
        >
            <View
                style={{
                    width: '100%',
                    // height: tabs ? dims.height - 100 : '100%',
                    backgroundColor: theme?.colors.screen,
                }}
            >

                <ScrollView
                    showsVerticalScrollIndicator={false}
                    style={{
                        // flex: 1,
                        width: '100%',
                        height: 'auto',
                        // height: tabs ? dims.height - 100 : dims.height - 50,
                        textAlign: 'left',
                    }}
                    // contentContainerStyle={{
                    //     borderWidth: 1,
                    //     borderStyle: 'dashed',
                    //     borderColor: 'red',
                    // }}
                >
                    <View
                        style={{
                            height: tabs ? dims.height - 100 : dims.height - 50,
                            width: '100%',
                            maxWidth: 600,
                            minWidth: 280,
                            marginHorizontal: 'auto',
                            // borderWidth: 1,
                            // borderStyle: 'dashed',
                            // borderColor: 'green',
                        }}
                    >
                        {(!secure || secure && user) && children}
                    </View>

                </ScrollView>
            </View>
        </View>
    )
}