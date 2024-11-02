import React, { useEffect, useMemo } from 'react'
import {
    ScrollView,
    View,
} from 'react-native'
import { Footer } from './components'
import { useApp } from '@app'
import { useModal } from '@modal'

export default Screen = ({ title, children, secure = true, ...props }) => {

    const { user } = useApp()
    const { clearModal } = useModal()

    const authorized = useMemo(() => (!secure || user !== null), [secure, user])

    const navigateHome = () => {
        clearModal()
        console.log('not authorized. going home.')
        props.navigation.navigate('Home')
    }

    useEffect(() => {
        if (!authorized) navigateHome()
    }, [])

    useEffect(() => {
        if (!authorized) navigateHome()
    }, [user])

    return authorized ? (
        <View style={{ flex: 1 }}>

            <ScrollView
                showsVerticalScrollIndicator={false}
                style={{
                    flexGrow: 1,
                    marginHorizontal: 5,
                }}
                contentContainerStyle={{
                    flex: 1,
                    paddingHorizontal: 5,
                    width: '100%',
                }}
            >
                {children}
            </ScrollView>

            <View style={{ flexGrow: 0 }}>
                <Footer />
            </View>

        </View>
    ) : null
}