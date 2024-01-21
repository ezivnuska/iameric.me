import React from 'react'
import {
    View,
} from 'react-native'
import { Button } from 'antd'

export default ({ onSelect }) => {

    const numDurations = 6

    const renderButtons = () => {
        const array = []

        while (array.length < numDurations) {

            let time = (array.length + 1) * 5
            
            array.push(
                <Button
                    key={time}
                    type='primary'
                    size='small'
                    onClick={() => onSelect(time)}
                    style={{
                        flex: 1,
                        flexShrink: 0,
                        height: 40,
                    }}
                >
                    {`${time} m`}
                </Button>
            )
        }
        
        return array.reverse()
    }

    return (
        <View
            style={{
                marginVertical: 15,
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'stretch',
                columnGap: 2,
            }}
        >
            {renderButtons()}
        </View>
    )
}