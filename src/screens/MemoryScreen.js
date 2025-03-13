import React, { useEffect } from 'react'
import { Screen } from './components'
import { MemoryList } from '@components'
import { useMemory, useSocket } from '@context'
import { deleteMemoryWithId, loadMemories } from '@utils/memories'

const MemoryScreen = props => {

    const {
        memories,
        deleteMemory,
        setMemories,
        setMemoriesLoading,
        updateMemory,
    } = useMemory()

    const { socket } = useSocket()
    
    useEffect(() => {
        
        socket.on('new_memory', memory => {
            console.log(' socket heard new memory', memory)
            updateMemory(memory)
        })

        socket.on('deleted_memory', deleteMemory)

        initMemories()

    }, [])
    
    const initMemories = async () => {

        setMemoriesLoading(true)
        const loadedMemories = await loadMemories()
        setMemoriesLoading(false)

        if (loadedMemories) setMemories(loadedMemories)
        else console.log('could not load posts')
    }

    const onDelete = async id => {
        
        await deleteMemoryWithId(id)

        socket.emit('memory_deleted', id)

        deleteMemory(id)
        
    }

    return (
        <Screen secure full {...props}>

            {memories && (
                <MemoryList
                    {...props}
                    memories={memories}
                    onDelete={onDelete}
                />
            )}
            
        </Screen>
    )
}

export default MemoryScreen