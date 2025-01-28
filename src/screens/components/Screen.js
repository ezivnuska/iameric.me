import React, { useEffect, useMemo } from 'react'
import { ScrollView, StyleSheet, View } from 'react-native'
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
        <View style={styles.flex}>

            <NavBar {...props} />

            <ScrollView
                showsVerticalScrollIndicator={false}
                style={styles.flex}
                contentContainerStyle={[
                    styles.flex,
                    !full && styles.padded,
                ]}
            >
                {children}
            </ScrollView>

        </View>
    )
}

export default Screen

const styles = StyleSheet.create({
    flex: {
        flex: 1,
        // backgroundColor: 'yellow',
        // borderWidth: 1,
        // borderStyle: 'dotted',
        // borderColor: 'blue',
    },
    padded: {
        paddingHorizontal: 10,
    },
})