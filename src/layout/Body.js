import React from 'react'
import {
    Dimensions,
    StyleSheet,
    View,
} from 'react-native'
const { height, width } = Dimensions.get('window')

const Body = ({ children, ...props }) => (
    <View style={styles.bodyContainer}>
        <View style={styles.body}>
            {children}
        </View>
    </View>
)

export default Body

const styles = StyleSheet.create({
    bodyContainer: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        flexGrow: 0,
        flexShrink: 0,
        flexBasis: height - 50,
        // paddingHorizontal: 20,
        paddingVertical: 0,
        backgroundColor: '#fff',
    },
    body: {
        flex: 1,
        display: 'flex',
        flexDirection:'row',
        alignItems: 'flex-start',
        minWidth: 375,
        maxWidth: 900,
        // width: '80%',
        margin: 0,
        padding: 0,
    },
})