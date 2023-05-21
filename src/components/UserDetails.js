import React from 'react'
import {
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native'
import { Avatar, UserHeading } from './'
import { CloseCircleOutlined } from '@ant-design/icons'
import defaultStyles from '../styles'

const UserDetails = ({ user, clearUser = null }) => {

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <UserHeading
                    user={user}
                />
                {clearUser ? (
                    <TouchableOpacity
                            style={styles.button}
                            onPress={() => clearUser()}
                        >
                            <CloseCircleOutlined />
                    </TouchableOpacity>
                ) : null}
            </View>
            <View style={styles.main}>
                <View style={styles.content}>
                    <Text style={[defaultStyles.text, defaultStyles.email]}>{user.email}</Text>
                </View>
            </View>
        </View>
    )
}

export default UserDetails

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        flexDirection: 'column',
        // paddingHorizontal: 10,
        width: '100%',
        // borderWidth: 1,
        // borderColor: 'orange',
        // paddingVertical: 10,
        // paddingHorizontal: 5,
    },
    header: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignContent: 'flex-start',
        flex: 1,
        flexBasis: 'auto',
        flexGrow: 0,
        // paddingLeft: 5,
        // borderWidth: 1,
        // borderColor: 'green',
    },
    main: {
        flex: 2,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-start',
    },
    button: {
        flex: 1,
        flexShrink: 0,
        flexGrow: 0,
        flexBasis: 30,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'flex-end',
        // paddingRight: 5,
        // borderWidth: 1,
        // borderColor: 'red',
    },
    content: {
        marginVertical: 10,
        // paddingHorizontal: 5,
        flex: 2,
    },
})