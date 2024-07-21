import React, { useEffect, useMemo } from 'react'
import { View } from 'react-native'
import { ScreenTitle } from './components'
import { Footer } from '@components'
import { useApp } from '@app'

export default Screen = ({ title, children, secure = true, ...props }) => {

    const { user } = useApp()

    const authorized = () => !secure || user

    useEffect(() => {
        if (!authorized()) {
            console.log(`not authorized for path ${props.route.path || props.route.name}`)
            props.navigation.navigate('Home')
        }
    }, [user])

    return authorized() ? (
        <View style={{ flexGrow: 1 }}>

            <View style={{ flexGrow: 1 }}>
                <ScreenTitle
                    {...props}
                    title={title}
                />
                
                {children}
            </View>

            <View style={{ flexGrow: 0 }}>
                <Footer />
            </View>

        </View>
    ) : null
}