import React from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { Screen } from 'screens'
import { navigate } from 'navigators'

const LoadingScreen = props => (
    <Screen { ...props }>
        <View style={styles.content}>
            <Text style={styles.heading}>Loading...</Text>
        </View>
    </Screen>
)

export default LoadingScreen

const styles = StyleSheet.create({
    content: {
        paddingVertical: 20,
        paddingHorizontal: 10,
        width: 400,
        minWidth: 400,
        maxWidth: 900,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignContent: 'stretch',
        // borderWidth: 1,
        // borderStyle: 'dotted',
        // borderColor: 'green',
    },
    heading: {
        marginBottom: 10,
        flexShrink: 1,
        flexBasis: 'auto',
        fontSize: 18,
        fontWeight: 700,
    },
    paragragh: {
        width: '100%',
        flexShrink: 1,
        flexGrow: 0,
        flexBasis: 'auto',
        lineHeight: '1.75em',
    },
    link: {
        color: 'blue',
    },
})