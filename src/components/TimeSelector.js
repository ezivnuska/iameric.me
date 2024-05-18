import React from 'react'
import {
    View,
} from 'react-native'
import { Button } from 'antd'

export default ({ onSelect }) => {

    const numDurations = 5

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
                        height: 40,
                        flexBasis: `${numDurations / 100}%`,
                    }}
                >
                    {`${time}m`}
                </Button>
            )
        }
        
        return array
    }

    return (
        <View
            style={{
                // width: '100%',
                marginVertical: 15,
                flexDirection: 'row',
                justifyContent: 'space-between',
                gap: 2,
            }}
        >
            {renderButtons()}
        </View>
    )
}