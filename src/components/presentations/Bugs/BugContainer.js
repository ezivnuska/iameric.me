import React, { useEffect, useMemo } from 'react'
import { View } from 'react-native'
import { BugView } from './components'
import { TextCopy } from '@components'
import { useBugs, useModal, useSocket } from '@context'
import { deleteEntryWithId } from '@utils/bugs'

const BugContainer = props => {

    const {
        bugs,
        addBug,
        deleteBug,
        setBugsLoading,
    } = useBugs()

    const { closeModal } = useModal()
    const { socket } = useSocket()

    useEffect(() => {
        socket.on('new_entry', addBug)
        socket.on('deleted_entry', deleteBug)
    }, [])

    const removeBug = async id => {

        setBugsLoading(true)
        await deleteEntryWithId(id)
        setBugsLoading(false)
        
        deleteBug(id)
        socket.emit('entry_deleted', id)
        
        closeModal()
    }
    
    return (
        <View
            style={{
                flex: 1,
                paddingHorizontal: 10,
                gap: 10,
            }}
        >
            
            {bugs.length > 0
                ? (
                    <View style={{ flexGrow: 1 }}>

                        {bugs.map((bug, index) => (
                            <BugView
                                key={`bug-${index}`}
                                item={bug}
                                onDelete={removeBug}
                            />
                        ))}

                    </View>
                )
                : (
                    <TextCopy
                        size={24}
                        style={{ lineHeight: 30 }}
                    >
                        No bugs to squash.
                    </TextCopy>
                )
            }
                
        </View>
    )
}

export default BugContainer