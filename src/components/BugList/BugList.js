import React, { useEffect } from 'react'
import { FlatList, Text, View } from 'react-native'
import { BugListItem, BugModal } from './components'
import { useBugs, useSocket, useTheme } from '@context'
import { deleteEntryWithId } from '@utils/bugs'

const BugList = props => {

    const {
        bugModal,
        bugs,
        updateBug,
        closeBugModal,
        deleteBug,
        setBugsLoading,
    } = useBugs()

    const { socket } = useSocket()
    const { styles } = useTheme()

    useEffect(() => {

        socket.on('new_entry', updateBug)
        socket.on('deleted_entry', deleteBug)
    }, [])

    const removeBug = async id => {

        setBugsLoading(true)
        await deleteEntryWithId(id)
        setBugsLoading(false)
        
        deleteBug(id)
        
        socket.emit('entry_deleted', id)
        
        closeBugModal()
    }
    
    return (
        <View
            style={{
                flex: 1,
                gap: 10,
            }}
        >
            {!bugs?.length && (
                <Text style={styles.copy}>
                    No bugs to squash.
                </Text>
            )}
            
            {bugs?.length && (
                <FlatList
                    data={bugs}
                    extraData={bugs}
                    keyExtractor={item => `bug-item-${item._id}`}
                    renderItem={({ item }) => <BugListItem item={item} onDelete={removeBug} />}
                    style={{ flex: 1 }}
                />
            )}

            <BugModal
                modal={bugModal}
                onClose={closeBugModal}
            />
                
        </View>
    )
}

export default BugList