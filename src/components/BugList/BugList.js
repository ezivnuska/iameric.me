import React, { useEffect } from 'react'
import { FlatList, View } from 'react-native'
import { BugListItem, BugModal} from './components'
import { BugNavBar, TextCopy } from '@components'
import { useBugs, useSocket } from '@context'
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
            
            {props.route.name === 'Bugs' && <BugNavBar {...props} />}

            {!bugs.length && (
                <TextCopy
                    size={24}
                    style={{ lineHeight: 30 }}
                >
                    No bugs to squash.
                </TextCopy>
            )}
            
            {bugs && (
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