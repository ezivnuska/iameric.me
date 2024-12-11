import React from 'react'
import { View } from 'react-native'
import { Navigation, MainHeader } from './components'

const Header = ({ landscape, user, route }) => {
    
    return (
        <View
            style={{
                flex: 1,
                width: '100%',
                flexDirection: landscape ? 'row' : 'column',
                justifyContent: landscape ? 'space-between' : 'flex-start',
                alignItems: landscape ? 'center' : 'flex-start',
                gap: 10,
                minWidth: 300,
                maxWidth: landscape ? '90%' : 400,
                marginHorizontal: 'auto',
            }}
        >
            <View
                style={{
                    flexGrow: landscape ? 1 : 0,
                    marginBottom: landscape ? 10 : 0,
                }}
            >
                <MainHeader user={user} />
            </View>

            {route && (
                <View
                    style={{
                        width: !landscape ? '100%' : 'auto',
                        flexGrow: landscape ? 0 : 1,
                        marginBottom: landscape ? 0 : 10,
                    }}
                >
                    <Navigation route={route} landscape={landscape} />
                </View>
            )}

        </View>
    )
}

export default Header