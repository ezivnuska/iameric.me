import React, { useEffect, useMemo } from 'react'
import { ScrollView, View } from 'react-native'
import { Footer } from './components'
import { useApp } from '@app'
import { useModal } from '@modal'
import { useUser } from '@user'

const Screen = ({ children, secure = false, ...props }) => {

    const { setAuthRoute } = useApp()
    const { modal, setModal } = useModal()
    const { user } = useUser()

    const authorized = useMemo(() => (!secure || user !== null), [user, secure])
    const routeName = useMemo(() => props.route.name, [props])

    useEffect(() => {
        if (!authorized) {
            console.log('props.route', props.route)
            setAuthRoute(props.route.name)
            console.log('not authorized for route', routeName)
            if (props.route.name !== 'Home') props.navigation.navigate('Home')
            else setModal('AUTH')
        }
    }, [routeName])

    // useEffect(() => {
    //     if (!modal) setAuthRoute(secure ? props.route.name : null)
    // }, [modal])

    if (!authorized) return <View />

    return (
        <View style={{ flex: 1 }}>

            <ScrollView
                showsVerticalScrollIndicator={false}
                style={{ flexGrow: 1 }}
                contentContainerStyle={{ flex: 1, width: '100%' }}
            >
                {children}
            </ScrollView>

            <View style={{ flexGrow: 0 }}>
                <Footer />
            </View>

        </View>
    )
}

export default Screen