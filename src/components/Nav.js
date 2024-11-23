import React, { useEffect } from 'react'
import { View } from 'react-native'
import { useApp } from '@app'
import { IconButtonLarge } from '.'

const Nav = props => {
    
    const { currentRoute, lastRoute } = useApp()

    // useEffect(() => {
    //     console.log('current', currentRoute)
    //     console.log('last', lastRoute)
    // }, [])

    return (
        <View style={{ paddingHorizontal: 10 }}>
            {(lastRoute && currentRoute.name !== 'Profile') && (
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