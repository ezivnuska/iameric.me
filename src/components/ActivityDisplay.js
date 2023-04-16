import React, { useContext, useEffect, useState } from 'react'
import {
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native'
import { ActivityList, ActivityListItem } from '.'
import { AppContext } from '../AppContext'
import { ColumnHeightOutlined, MinusOutlined } from '@ant-design/icons'

const ActivityDisplay = () => {

    const {
        state,
        dispatch,
    } = useContext(AppContext)

    const { activities } = state

    const [ listVisible, setListVisible ] = useState(false)

    const toggleVisibility = () => {
        console.log(`${activities.length} activities`)
        setListVisible(!listVisible)
    }

    return (activities && activities.length) ? (
        <View style={styles.container}>
            <View style={styles.activity}>
                {listVisible ? (
                    <ActivityList
                        activities={activities}
                    />
                ) : (
                    <ActivityListItem
                        activity={activities[0]}
                    />
                )}
            </View>
            {activities.length > 1 ? (
                <TouchableOpacity
                    style={styles.toggle}
                    onPress={() => toggleVisibility()}
                >
                    {listVisible ? (
                        <Text style={styles.icon}><MinusOutlined /></Text>
                    ) : (
                        <Text style={styles.icon}><ColumnHeightOutlined /></Text>
                    )}
                </TouchableOpacity>
            ) : null}
        </View>
    ) : null
}

export default ActivityDisplay

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: 400,
        minWidth: 400,
        maxWidth: 500,
        marginHorizontal: 'auto',
        borderWidth: 1,
        borderColor: 'red',
        borderRadius: 12,
    },
    activity: {
        flex: 'auto',
        flexGrow: 1,
    },
    toggle: {
        flex: 1,
        flexGrow: 0,
        flexBasis: 'auto',
    },
    icon: {
        paddingHorizontal: 10,
        lineHeight: 30,
    }
})