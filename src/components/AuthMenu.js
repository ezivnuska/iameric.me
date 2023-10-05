import React, { useContext } from 'react'
import {
    Text,
    TouchableOpacity,
    View,
} from 'react-native'
import {
    CartButton,
    CloseButton,
} from '.'
import { AppContext } from '../AppContext'
import { navigate } from '../navigators/RootNavigation'
import layout from '../styles/layout'

const SettingsButton = ({ label }) => (
    <TouchableOpacity
        onPress={() => navigate('Settings')}
        style={{
            flex: 1,
            flexShrink: 0,
            flexShrink: 1,
            flexBasis: 'auto',
            marginHorizontal: layout.horizontalPadding,
            padding: 5,
        }}
    >
        <Text style={{
            color: '#fff',
            fontWeight: 700,
        }}>
            {label}
        </Text>
    </TouchableOpacity>
)
const AuthMenu = () => {
    
    const {
        cart,
        user,
        ready,
    } = useContext(AppContext)

    const { items } = cart

    return user && ready ? (
        <View style={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'flex-end',
            height: '100%',
        }}>

            {items && items.length ? <CartButton /> : null}

            <SettingsButton label={user.username} />
        </View>
    ) : null
}

export default AuthMenu