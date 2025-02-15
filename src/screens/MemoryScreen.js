import React, { useEffect } from 'react'
import { Screen } from './components'
import { MemoryList } from '@components'
import { useMemory } from '@context'
    
const MemoryScreen = props => {

    const { memoriesLoaded, memoriesLoading, initMemories } = useMemory()

    useEffect(() => {
        initMemories()
    }, [])

    return (
        <Screen secure full {...props}>

            {memoriesLoaded && <MemoryList {...props} />}
            
        </Screen>
    )
}

export default MemoryScreen