import React, { useContext } from 'react'
import {
    Dimensions,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native'
import { CloseCircleOutlined } from '@ant-design/icons'
import defaultStyles from '../styles'
import { AppContext } from '../AppContext'

const windowWidth = Dimensions.get('window').width
const windowHeight = Dimensions.get('window').height

const EntryListItem = ({ entry, deleteEntry }) => {
    
    const {
        state,
        dispatch,
    } = useContext(AppContext)
    
    const { _id, userId, username, text } = entry
    const { user } = state

    return user ? (
        <View style={styles.container}>
            <View style={styles.flexContainer}>
                <View style={styles.title}>
                    <Text style={styles.username}>{username}</Text>
                </View>
                {userId === user._id ? (
                    <View style={styles.aside}>
                        <TouchableOpacity
                            style={styles.iconDelete}
                            onPress={() => deleteEntry(_id)}
                        >
                            <CloseCircleOutlined />
                        </TouchableOpacity>
                    </View>
                ) : null}
            </View>
            <View style={styles.textContainer}>
                <Text style={[defaultStyles.text, styles.text]}>{text}</Text>
            </View>
        </View>
    ) : null
}

export default EntryListItem

const styles = StyleSheet.create({
    container: {
        minWidth: 375,
        maxWidth: 400,
        paddingBottom: 10,
        paddingLeft: 0,
    },
    flexContainer: {
        display: 'flex',
        flexDirection: 'row',
    },
    title: {
        flex: 1,
        flexBasis: '90%',
        flexGrow: 1,
    },
    username: {
        fontSize: 16,
        lineHeight: 24,
        fontWeight: 700,
        marginTop: 2, 
        color: '#999',
    },
    textContainer: {
        padding: 2,
    },
    text: {
        width: '90%',
    },
    aside: {
        flex: 1,
        flexBasis: 'auto',
        flexShrink: 1,
        flexGrow: 0,
        alignContent: 'center',
    },
    iconDelete: {
        paddingTop: 5,
        // paddingHorizontal: 10,
    },
})