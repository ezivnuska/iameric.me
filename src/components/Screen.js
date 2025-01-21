import React, { useEffect, useMemo } from 'react'
import { ScrollView, View } from 'react-native'
import { useApp, useModal, useTheme, useUser } from '@context'
import { NavBar } from '@components'

const Screen = ({
    children,
    full = false,
    secure = false,
    ...props
}) => {

    const { setAuthRoute } = useApp()
    const { landscape } = useTheme()
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
        <View
            style={{
                flex: 1,
                borderWidth: 1,
                borderStyle: 'dashed',
            }}
        >
            <NavBar route={props.route} landscape={landscape} />

            <ScrollView
                // horizontal={landscape}
                showsVerticalScrollIndicator={false}
                style={{ flexGrow: 1 }}
                contentContainerStyle={{
                    flex: 1,
                    width: '100%',
                    maxWidth: landscape ? '90%' : 400,
                    marginHorizontal: 'auto',
                    // maxWidth: (landscape && !full) ? '90%' : null,
                    // marginHorizontal: 'auto',
                    paddingHorizontal: !full ? 10 : 0,
                    paddingVertical: 10,
                }}
            >
                {children}
            </ScrollView>

        </View>
    )
}

export default Screen