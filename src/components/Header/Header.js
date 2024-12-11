import React from 'react'
import { View } from 'react-native'
import { Navigation, MainHeader } from './components'

const Header = ({ landscape, user, route }) => {
    
    return (
        <View
            style={{
                width: '100%',
                flexDirection: landscape ? 'row' : 'column',
                justifyContent: landscape ? 'space-between' : 'flex-start',
                alignItems: landscape ? 'center' : 'flex-start',
                gap: landscape ? 10 : 0,
                minWidth: 300,
                maxWidth: !landscape ? 400 : null,
                marginHorizontal: landscape ? 0 : 'auto',
                overflow: 'visible',
                marginBottom: 10,
            }}
        >
            <View style={{ flexGrow: landscape ? 1 : 0 }}>
                <MainHeader user={user} />
            </View>

            {route && (
                <View style={{ flexGrow: landscape ? 0 : 1 }}>
                    <Navigation route={route} landscape={landscape} />
                </View>
            )}

        </View>
    )
}

export default Header