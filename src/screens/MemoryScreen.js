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

    // useEffect(() => {
    //     initMemories()
    // }, [memories])
    
    const initMemories = async () => {

        setMemoriesLoading(true)
        const loadedMemories = await loadMemories()
        setMemoriesLoading(false)

        if (loadedMemories) {
            // console.log('loadedMemories', loadedMemories)
            setMemories(loadedMemories)
            // setMemories(loadedMemories.map(item => item._id))
        }
    }

    return (
        <Screen secure full {...props}>

            {memories && <MemoryList memories={memories} {...props} />}
            {/* {ids && <MemoryList ids={ids} {...props} />} */}
            
        </Screen>
    )
}

export default MemoryScreen