import React, { useEffect, useMemo } from 'react'
import { ScrollView, View } from 'react-native'
import { useApp, useModal, useUser } from '@context'

const Screen = ({
    children,
    full = false,
    secure = false,
    ...props
}) => {

    const { setAuthRoute } = useApp()
    const { setModal } = useModal()
    const { authUser } = useUser()

    const authorized = useMemo(() => (!secure || authUser !== null), [authUser])
    const routeName = useMemo(() => props.route.name, [props])

    useEffect(() => {
        
        if (!authorized) {
            console.log('not authorized for route', routeName)
            if (routeName !== 'Home') {
                setAuthRoute(props.route)
                props.navigation.navigate('Home')
            } else setModal('AUTH')
        }
    }, [authorized])

    if (!authorized) return <View style={{ flex: 1 }} />

    return (
        <View style={{ flex: 1 }}>

            <ScrollView
                showsVerticalScrollIndicator={false}
                style={{ flex: 1 }}
                contentContainerStyle={{
                    paddingHorizontal: full ? 0 : 15,
                    paddingVertical: 10,
                    flex: 1,
                }}
            >
                {children}
            </ScrollView>

        </View>
    )
}

export default Screen