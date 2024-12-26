import React, { useEffect } from 'react'
import { View } from 'react-native'
import { TextCopy } from '@components'

const Tile = ({ label, size, ...props }) => {

    return (
        <View
            style={[
                {
                    flex: 1,
                    width: '100%',
                    height: size,
                    width: size,
                    overflow: 'hidden',
                    borderRadius: 8,
                },
                props.style,
            ]}
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