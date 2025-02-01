import React, { useEffect } from 'react'
import { ActivityIndicator } from 'react-native-paper'
import { Screen } from './components'
import { Feed } from '@components'
import { useFeed } from '@context'
    
const FeedScreen = props => {

    const { feedLoaded, feedLoading, initFeed } = useFeed()

    useEffect(() => {
        initFeed()
    }, [])

    return (
        <Screen secure full {...props}>

            {feedLoaded && <Feed {...props} />}
            
        </Screen>
    )
}

export default FeedScreen