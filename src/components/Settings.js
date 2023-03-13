import React from 'react'
import {
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native-web'
import {
    EntryDisplay,
} from '.'
import { navigate } from '../navigators/RootNavigation'
import { LeftOutlined } from '@ant-design/icons'

const Settings = () => {
    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity
                    style={styles.iconCol}
                    onPress={() => navigate('Private')}
                >
                    <LeftOutlined />
                </TouchableOpacity>
    
                <Text style={styles.headingCol}>Settings</Text>
            </View>
            <EntryDisplay />
        </View>
    )
}

export default Settings

const styles = StyleSheet.create({
    container: {
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-start',
        borderWidth: 1,
        borderColor: 'black',
    },
    header: {
        flex: 1,
        flexGrow: 1,
        paddingTop: 10,
        paddingBottom: 20,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'flex-start',
        flexBasis: 'auto',
        borderWidth: 1,
        borderColor: 'pink',
    },
    iconCol: {
        flex: 1,
        flexShrink: 0,
        flexGrow: 0,
        flexBasis: 'auto',
        borderWidth: 1,
        borderColor: 'blue',
    },
    headingCol: {
        flex: 1,
        flexBasis: 'auto',
        flexShrink: 0,
        flexGrow: 1,
        fontSize: 18,
        fontWeight: 600,
        borderWidth: 1,
        borderColor: 'yellow',
    },
})