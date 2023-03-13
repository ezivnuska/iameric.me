import React from 'react'
import {
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native'
// import { Avatar } from './'
import { CloseCircleOutlined } from '@ant-design/icons'
import defaultStyles from '../styles'

const UserDetails = ({ clearUser, user }) => (
    <View style={styles.container}>
        <View style={styles.leftColumn}>
            {/*<Avatar user={user} size={50} />*/}
        </View>
        <View style={styles.main}>
            <View style={styles.header}>
                <Text style={styles.heading}>{user.username}</Text>
                <TouchableOpacity
                    style={styles.icon}
                    onPress={() => clearUser()}
                >
                    <CloseCircleOutlined />
                </TouchableOpacity>
            </View>
            <View style={styles.content}>
                <Text style={[defaultStyles.text, defaultStyles.email]}>{user.email}</Text>
            </View>
        </View>
    </View>
)

export default UserDetails

const styles = StyleSheet.create({
    container: {
        paddingVertical: 12,
        display: 'flex',
        flexDirection: 'row',
    },
    leftColumn: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignContent: 'flex-start',
        flex: 1,
        flexBasis: 'auto',
        flexGrow: 0,
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
        marginBottom: 15,
    },
    heading: {
        flex: 2,
        fontSize: 18,
        fontWeight: 600,
        lineHeight: 24,
    },
    icon: {
        flex: 1,
        flexShrink: 0,
        flexGrow: 0,
        flexBasis: 25,
    },
    content: {
        flex: 2,
    },
})