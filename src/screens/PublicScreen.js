import React from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { Screen } from './'
import { navigate } from '../navigators/RootNavigation'

const HomeScreen = props => (
    <Screen { ...props }>
        <View style={styles.container}>
            <Text style={styles.paragragh}>
                <TouchableOpacity
                    style={styles.link}
                    onPress={() => navigate('SignIn')}
                >
                    <Text style={styles.text}>sign in</Text>
                </TouchableOpacity>
            </Text>
            <Text style={styles.paragragh}>
                <TouchableOpacity
                    style={styles.link}
                    onPress={() => navigate('SignUp')}
                >
                    <Text style={styles.text}>sign up</Text>
                </TouchableOpacity>
            </Text>
        </View>
    </Screen>
)

export default HomeScreen

const styles = StyleSheet.create({
    container: {
        paddingVertical: 20,
        paddingHorizontal: 10,
        width: 400,
        minWidth: 400,
        maxWidth: 900,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignContent: 'stretch',
    },
    paragragh: {
        width: '100%',
        flexShrink: 1,
        flexGrow: 0,
        flexBasis: 'auto',
    },
    text: {
        lineHeight: '1.75em',
    },
    link: {
        color: 'blue',
    },
})