import React from 'react'
import { View } from 'react-native'
import { Navigation, MainHeader } from './components'

const Header = ({ landscape, user, route }) => {

    const textSize = 20
    
    return (
        <View
            style={{
                flex: 1,
                width: '100%',
                flexDirection: landscape ? 'row' : 'column',
                justifyContent: landscape ? 'space-between' : 'flex-start',
                alignItems: landscape ? 'center' : 'stretch',
                gap: 15,
                minWidth: 300,
                maxWidth: landscape ? '90%' : 400,
                marginHorizontal: 'auto',
                marginBottom: 20,
                marginTop: 10,
                height: 'auto',
            }}
        >
            <MainHeader
                user={user}
                landscape={landscape}
                size={textSize}
            />

            {route && (
                <Navigation
                    route={route}
                    size={textSize}
                />
            )}

        </View>
    )
}

export default Header