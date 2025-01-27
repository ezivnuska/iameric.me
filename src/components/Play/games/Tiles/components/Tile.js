import React from 'react'
import { View } from 'react-native'
import { Text } from 'react-native-paper'
import { getModifiedColor } from '@utils'

const Tile = ({
    direction,
    dragging,
    label,
    size,
    ...props
}) => {
            
    const colorBase = '#ff0000'
    const colors = {
        dragged: getModifiedColor(colorBase, 50),
        enabled: getModifiedColor(colorBase, 25),
    }

    return (
        <View
            style={[{
                flex: 1,
                width: '100%',
                height: size,
                width: size,
                // backgroundColor: dragging
                //     ? colors.dragged
                //     : direction
                //         ? colors.enabled
                //         : colorBase,
            }, props.style]}
        >
            <Text
                variant='displayLarge'
                // textColor={direction ? 'blue' : 'orange'}
                style={{
                    flex: 1,
                    lineHeight: size,
                    color: direction ? 'blue' : 'orange',
                    textAlign: 'center',
                }}
            >
                {label}
            </Text>

        </View>
    )
}

export default Tile