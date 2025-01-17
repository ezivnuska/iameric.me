import React, { useEffect, useMemo } from 'react'
import { ScrollView, View } from 'react-native'
import { useApp, useModal, useUser } from '@context'

const Screen = ({
    children,
    full = false,
    secure = false,
    ...props
}) => {

    const { landscape, setAuthRoute } = useApp()
    const { setModal } = useModal()
    const { user } = useUser()

    const authorized = useMemo(() => (!secure || user !== null), [user, secure])
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
                // horizontal={landscape}
                showsVerticalScrollIndicator={false}
                style={{ flexGrow: 1 }}
                contentContainerStyle={{
                    flex: 1,
                    width: '100%',
                    maxWidth: (landscape && !full) ? '90%' : null,
                    marginHorizontal: 'auto',
                    paddingHorizontal: !full ? 10 : 0,
                    // paddingVertical: 10,
                }}
            >
                {children}
            </ScrollView>

        </View>
    )
}

export default Screen