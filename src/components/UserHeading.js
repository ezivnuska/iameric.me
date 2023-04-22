import React, { useEffect } from 'react'
import {
    StyleSheet,
    Text,
    View,
} from 'react-native'
import { Avatar } from '.'
import defaultStyles from '../styles'

const UserHeading = ({ user, styleProps, ...props }) => {
    
    // useEffect(() => {
    //     console.log('user', user)
    // }, [])
    
    return (
        <View style={[styles.container, styleProps]}>
            <View style={styles.leftColumn}>
                <Avatar user={user}
                size={24}
            />
            </View>
            <View style={styles.main}>
                <View style={styles.header}>
                    <Text style={styles.heading}>{user.username}</Text>
                </View>
            </View>
        </View>
    )
}

export default UserHeading

const styles = StyleSheet.create({
    container: {
        // paddingVertical: 12,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        width: 350,
        minWidth: 300,
        maxWidth: 400,
        // marginHorizontal: 'auto',
    },
    leftColumn: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignContent: 'flex-start',
        flex: 1,
        flexBasis: 'auto',
        flexGrow: 0,
        flexShrink: 0,
        paddingRight: 10,
    },
    main: {
        flex: 2,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-start',
    },
    header: {
        display: 'flex',
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignContent: 'flex-start',
        // marginBottom: 15,
    },
    heading: {
        flex: 2,
        fontSize: 18,
        fontWeight: 600,
        lineHeight: 24,
    },
    content: {
        flex: 2,
    },
})