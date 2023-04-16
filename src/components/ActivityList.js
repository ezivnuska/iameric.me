import React from 'react'
import {
    FlatList,
    StyleSheet,
    View,
} from 'react-native'
import { ActivityListItem } from './'

const ActivityList = ({ activities, ...props }) => {
    console.log('activities', activities)
    return (
        <View style={styles.container} {...props}>
            <FlatList
                data={activities}
                keyExtractor={(item, index) => 'key' + index}
                renderItem={({ item }) => (
                    <ActivityListItem
                        activity={item}
                    />
                )} 
            />
        </View>
    )
}

export default ActivityList

const styles = StyleSheet.create({
    container: {

    },
})