import React, { useEffect, useContext, useState } from 'react'
import {
    ActivityIndicator,
    Dimensions,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native'
import { CloseCircleOutlined } from '@ant-design/icons'
import defaultStyles from '../styles'


const MenuListItem = ({ item, onDelete, ...props }) => {
    const { _id, title } = item
    return (
        <View style={styles.container} {...props}>
            <View style={styles.flexContainer}>
                
                <Text style={styles.title}>{title}</Text>
                <View style={styles.aside}>
                    <TouchableOpacity
                        style={styles.iconDelete}
                        onPress={() => onDelete(entry._id)}
                    >
                        <CloseCircleOutlined />
                    </TouchableOpacity>
                </View>
            </View>
            <View style={styles.textContainer}>
                <Text style={[defaultStyles.text, styles.text]}>{_id}</Text>
            </View>
        </View>
    )
}

export default MenuListItem

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        marginBottom: 5,
        paddingBottom: 10,
    },
    flexContainer: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    setForDeletion: {
        opacity: .3,
    },
    title: {
        flex: 1,
        flexBasis: 'auto',
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
        paddingVertical: 5,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
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
        marginLeft: 5,
        marginRight: 2,
        paddingTop: 5,
    },
})