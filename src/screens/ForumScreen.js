import React from 'react'
import { View } from 'react-native'
import { Screen } from '@components'
import { Forum } from '@modules'
    
export default props => {

    return (
        <Screen
            {...props}
            title='Forum'
        >
            <View
                style={{
                    flexGrow: 1,
                    justifyContent: 'space-between',
                    gap: 20,
                }}
            >

                <View style={{ flexGrow: 1 }}>
                    <Forum />
                </View>

            </View>
            
        </Screen>
    )
}