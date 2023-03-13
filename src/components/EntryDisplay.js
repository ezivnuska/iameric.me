import React, { useContext, useEffect, useRef } from 'react'
import {
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native-web'
import { navigate } from '../navigators/RootNavigation'
import axios from 'axios'

import { LeftOutlined } from '@ant-design/icons'

import { EntryList, FeedbackForm } from './'
import { AppContext } from '../AppContext'
const API_PATH = process.env.API_PATH || '/api'

const EntryDisplay = ({ navigation }) => {

    const {
        state,
        dispatch,
    } = useContext(AppContext)

    const { entries } = state
    // const [ loaded, setLoaded ] = useState(false)
    const mounted = useRef(false)

    
    const getEntries = () => {
        axios
            .get(`${API_PATH}/entries`)
            .then(({ data }) => {
                dispatch({ type: 'SET_ENTRIES', entries: data.entries })
            })
    }

    useEffect(() => {
        getEntries()
    }, [])

    const deleteEntry = id => {
        axios
            .post(`${API_PATH}/entry/delete`, { id })
            .then(result => dispatch({ type: 'ENTRY_DELETE', entryId: id }))
            .catch(err => console.log('Error deleting entry', err))
    }

    return entries ? (
        <View style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity
                    style={styles.iconCol}
                    onPress={() => navigate('Private')}
                >
                    <Text>Back</Text>
                    <LeftOutlined />
                </TouchableOpacity>
    
                <Text style={styles.headingCol}>Settings</Text>
            </View>
            <FeedbackForm />
            <EntryList entries={entries} deleteEntry={deleteEntry} />
        </View>
    ) : <Text>Loading...</Text>
}

export default EntryDisplay

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexBasis: 'auto',
        alignContent: 'center',
        display: 'flex',
        flexDirection: 'column',
        // justifyContent: 'center',
        // width: 375,
        // marginHorizontal: 'auto',
    },
    header: {
        flex: 1,
        paddingTop: 10,
        paddingBottom: 20,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'flex-start',
    },
    iconCol: {
        flex: 1,
        flexShrink: 0,
        flexGrow: 0,
        flexBasis: 25,
    },
    headingCol: {
        flex: 1,
        flexBasis: 'auto',
        flexShrink: 0,
        flexGrow: 0,
        fontSize: 18,
        fontWeight: 600,
        // marginBottom: 10,
    },
})