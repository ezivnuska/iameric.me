import React from 'react'
import { View } from 'react-native'
import { TextCopy } from '@components'
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
            <TextCopy
                bold
                color='#FFE04B'
                align='center'
                size={48}
                style={{
                    flex: 1,
                    lineHeight: size,
                }}
            >
                {label}
            </TextCopy>

        </View>
    )
}

export default Tile