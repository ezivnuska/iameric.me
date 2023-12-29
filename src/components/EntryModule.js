import React, { useContext, useEffect, useState } from 'react'
import {
    Text,
    View,
} from 'react-native'
import {
    EntryList,
    FeedbackForm,
    PopUpModal,
} from '.'
import { AppContext } from '../AppContext'
import defaultStyles from '../styles/main'
import { deleteEntryWithId, loadEntries } from '../utils/data'
import { Button } from 'antd'
import {
    PlusCircleOutlined,
} from '@ant-design/icons'

export default ({ navigation }) => {
    
    const {
        dispatch,
        entries,
    } = useContext(AppContext)

    const [loading, setLoading] = useState(false)
    const [modalVisible, setModalVisible] = useState(false)

    useEffect(() => {
        if (!entries) init()
    }, [])

    const init = async () => {
        setLoading(true)

        const entriesLoaded = await loadEntries()
        
        if (entriesLoaded) {
            dispatch({ type: 'SET_ENTRIES', entries: entriesLoaded })
        }

        setLoading(false)
    }

    const removeItemById = async id => {

        setLoading(true)

        const entryDeleted = await deleteEntryWithId(id)
        
        
        if (entryDeleted) {
            dispatch({ type: 'DELETE_ENTRY', id: entryDeleted._id })
        }
        
        setLoading(false)
    }
    
    const renderHeader = () => (
        <View
            style={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'flex-start',
                alignItems: 'center',
                marginBottom: 10,
            }}
        >
            <Text
                style={{
                    flex: 1,
                    flexGrow: 0,
                    flexBasis: 'auto',
                    fontSize: 24,
                    fontWeight: 700,
                    lineHeight: 32,
                }}
            >
                Feedback
            </Text>
            
            
            <View style={{
                flex: 1,
                flexGrow: 0,
                flexShrink: 1,
                flexBasis: 'auto',
                paddingHorizontal: 10,
            }}>
                <Button
                    size='small'
                    // shape='circle'
                    icon={loading ? null : <PlusCircleOutlined />}
                    onClick={() => setModalVisible(true)}
                    disabled={loading}
                />
            </View>
        </View>
    )

    return (
        <View>
            
            {renderHeader()}
            
            {loading
                ? <Text>Loading Entries...</Text>
                : entries && entries.length
                    ? (
                        <EntryList
                            entries={entries}
                            deleteItem={removeItemById}
                        />
                    )
                    : <Text>No entries yet.</Text>}

            <PopUpModal
                visible={modalVisible}
                onRequestClose={() => setModalVisible(false)}
            >
                <FeedbackForm
                    onComplete={() => setModalVisible(false)}
                />
            </PopUpModal>

        </View>
    )
}