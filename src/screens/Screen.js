import React, { useEffect, useState } from 'react'
import {
    ScrollView,
} from 'react-native'
import {
    LoadingView,
} from '@components'
import {
    useApp,
} from '@context'

const SecureLayer = ({ userId, children }) => userId ? children : null

export default ({
    children,
    secure = true,
    ...props
}) => {
    
    const { appLoaded, dims, userId } = useApp()
    const [secured, setSecured] = useState(false)
    
    useEffect(() => {
        const verified = (!secure || (secure && userId !== null))
        if (!verified) props.navigation.navigate('Splash')
        else setSecured(true)
        // else if (secure && !userId) props.navigation.navigate('Start')
    }, [userId])

    if (!appLoaded) return <LoadingView loading='Authorizing...' />

    const renderContent = () => secure
        ? <SecureLayer userId={userId}>{children}</SecureLayer>
        : children

    return secured ? (
        <ScrollView
            contentContainerStyle={{ height: '100%' }}
            style={{
                height: dims.height - 50,
                width: '100%',
                maxWidth: '100%',
                marginHorizontal: 'auto',
            }}
        >
            {renderContent(children)}
        </ScrollView>
    ) : <LoadingView loading='Checking Auth...' />
}