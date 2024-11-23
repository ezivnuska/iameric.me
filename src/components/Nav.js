import React from 'react'
import { View } from 'react-native'
import { useApp } from '@app'
import { IconButtonLarge } from '.'

const Nav = props => {
    
    const { currentRoute, lastRoute } = useApp()

    return (
        <View style={{ paddingHorizontal: 10 }}>
            {(lastRoute && lastRoute.name !== currentRoute.name) && (
                <IconButtonLarge
                    label={lastRoute.name}
                    name='chevron-back-sharp'
                    onPress={() => props.navigation.navigate(lastRoute.name)}
                    color='#000'
                    transparent
                />
            )}
        </View>
    )
}

export default Nav