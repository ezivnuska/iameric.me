import React, { useEffect } from 'react'
import { ActivityIndicator } from 'react-native-paper'
import { Screen } from './components'
import { BugList } from '@components'
import { useBugs } from '@context'
    
const BugScreen = props => {
    
    const { bugsLoaded, bugsLoading, initBugs } = useBugs()
    
    useEffect(() => {
        initBugs()
    }, [])
    
    return (
        <Screen full secure {...props}>
            {bugsLoaded && <BugList {...props} />}
        </Screen>
    )
}

export default BugScreen