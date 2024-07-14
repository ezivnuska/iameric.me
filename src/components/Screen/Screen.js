import React, { useEffect, useMemo } from 'react'
import { View } from 'react-native'
import { ScreenTitle } from './components'
import { Footer } from '@components'
import { useApp } from '@app'

export default Screen = ({ children, secure = true, title = null, ...props }) => {

    const { user } = useApp()

    const authorized = useMemo(() => {
        if(secure) {
            if (user) return true
            else return false
        } else return true
    }, [secure, user])

    useEffect(() => {
        if (!authorized) {
            console.log(`not authorized for path ${props.route.path || props.route.name}`)
            props.navigation.navigate('Home')
        }
    }, [authorized])

    return (
        <View style={{ flexGrow: 1 }}>

            <View style={{ flexGrow: 1 }}>
            
                {title && <ScreenTitle title={title} />}
                
                {authorized && children}
            </View>

            <View style={{ flexGrow: 0 }}>
                <Footer />
            </View>

        </View>
    )
}