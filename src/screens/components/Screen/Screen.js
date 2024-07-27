import React, { useEffect, useMemo } from 'react'
import {
    ScrollView,
    View,
} from 'react-native'
import { Footer } from './components'
import { useApp } from '@app'

export default Screen = ({ title, children, secure = true, ...props }) => {

    const { user } = useApp()

    const authorized = useMemo(() => (!secure || user !== null), [secure, user])

    useEffect(() => {
        // console.log(`${authorized ? '' : 'not '}authorized for path ${props.route.path || props.route.name}`)
        if (!authorized) props.navigation.navigate('Home')
    }, [user])

    return authorized ? (
        <View style={{ flex: 1 }}>

            <ScrollView
                showsVerticalScrollIndicator={false}
                style={{
                    flexGrow: 1,
                    marginHorizontal: 5,
                    borderWidth: 1,
                    borderRadius: 6,
                    borderColor: '#aaa',
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