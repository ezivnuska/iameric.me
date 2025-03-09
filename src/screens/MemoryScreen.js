import React, { useEffect, useState } from 'react'
import { Screen } from './components'
import { MemoryList } from '@components'
import { useMemory } from '@context'
import { loadMemories } from '@utils/memories'
    
const MemoryScreen = props => {

    const { memories, setMemories, setMemoriesLoading } = useMemory()

    const [ids, setIds] = useState(null)

    useEffect(() => {
        initMemories()
    }, [])
    
    const initMemories = async () => {

        setMemoriesLoading(true)
        const loadedMemories = await loadMemories()
        setMemoriesLoading(false)

        if (loadedMemories) {
            setIds(loadedMemories.map(memory => memory._id))
        }
    }

    return (
        <Screen secure full {...props}>

            {ids && <MemoryList ids={ids} {...props} />}
            
        </Screen>
    )
}

export default MemoryScreen