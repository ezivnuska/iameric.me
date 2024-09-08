import React, { useState } from 'react'
import {
    Pressable,
    View,
} from 'react-native'
import {
    AboutNav,
    Screen,
} from './components'
import {
    Heading,
    ThemedText,
} from '@components'
import {
    Play,
    Work,
} from '@modules'

export default props => {

    const [ type, setType ] = useState('work')

    return (
        <Screen
            {...props}
            secure={false}
        >
    
            <View style={{ flex: 1 }}>
    
                <Heading
                    title='About Me'
                    onBack={() => props.navigation.navigate('Bips', { screen: 'BipList' })}
                >
                    <AboutNav
                        type={type}
                        onChange={type => setType(type)}
                    />
                </Heading>

                {type === 'work'
                    ? <Work />
                    : <Play />
                }
    
            </View>
    
        </Screen>
    )
}