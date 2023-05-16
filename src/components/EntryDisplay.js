import React, { useContext } from 'react'
import {
    StyleSheet,
    View,
} from 'react-native'
import {
    EntryList,
    FeedbackForm,
} from './'
import { AppContext } from '../AppContext'

const EntryDisplay = () => {
    
    const {
        dispatch,
    } = useContext(AppContext)
    
    const updateStatus = text => dispatch({ type: 'SET_STATUS', status: text })

    return (
        <View style={styles.container}>
            <FeedbackForm updateStatus={updateStatus} />
            <EntryList />
        </View>
    )
}

export default EntryDisplay

const styles = StyleSheet.create({
    container: {
        // borderWidth: 1,
        // borderColor: 'blue',
    },
})