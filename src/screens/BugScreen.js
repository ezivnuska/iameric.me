import React, { useEffect } from 'react'
import { Screen } from './components'
import { Bugs } from '@components'
import { useBugs } from '@context'
    
const BugScreen = props => {
    
    const { bugsLoaded, bugsLoading, initBugs } = useBugs()
    
    useEffect(() => {
        initBugs()
    }, [])
    
    return (
        <Screen full secure {...props}>
            {bugsLoaded && <Bugs {...props} />}
        </Screen>
    )
}

export default BugScreen