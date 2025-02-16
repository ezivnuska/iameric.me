import React, { useEffect, useState } from 'react'
import { Screen } from './components'
import { MemoryList } from '@components'
import { useMemory } from '@context'
import { loadMemories } from '@utils/memories'
    
const MemoryScreen = props => {

    const { memoriesLoaded, memoriesLoading, setMemoriesLoading } = useMemory()

    const [ids, setIds] = useState(null)

    useEffect(() => {
        initMemories()
    }, [])
    
    const initMemories = async () => {
        setMemoriesLoading(true)
        const payload = await loadMemories()
        setMemoriesLoading(false)

        if (payload) {
            // console.log('payload', payload)
            setIds(payload.map(item => item._id))
        }
    }

    return (
        <Screen secure full {...props}>

            {ids && <MemoryList ids={ids} {...props} />}
            
        </Screen>
    )
}

export default MemoryScreen