import React, { useEffect, useMemo } from 'react'
import { ScrollView, View } from 'react-native'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { useApp, useModal, useUser } from '@context'

const Screen = ({
    children,
    full = false,
    secure = false,
    ...props
}) => {

    const { setAuthRoute } = useApp()
    const { addModal } = useModal()
    const { user } = useUser()

    const authorized = useMemo(() => (!secure || user !== null), [user])
    const routeName = useMemo(() => props.route.name, [props])

    useEffect(() => {
        if (!authorized) {
            console.log('not authorized for route', routeName)
            if (routeName !== 'Home') {
                setAuthRoute(props.route)
                props.navigation.navigate('Home')
            } else addModal('AUTH')
        }
    }, [authorized])

    if (!authorized) return <View style={{ flex: 1 }} />

    return (

        <KeyboardAwareScrollView
            showsVerticalScrollIndicator={false}
            // style={{ flex: 1 }}
            // contentContainerStyle={{
            //     flex: 1,
            //     width: '100%',
            //     paddingHorizontal: full ? 0 : 15,
            // }}
        >
            {children}
        </KeyboardAwareScrollView>

    )
}

export default Screen