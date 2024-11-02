import React, { useMemo, useState } from 'react'
import {
    Pressable,
    Text,
    View,
} from 'react-native'

const FatButton = ({ label, size, onPress }) => (
    <Pressable
        onPress={onPress}
        style={{
            width: size,
            height: size,
        }}
    >
        <View
            style={{
                flex: 1,
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
                margin: 1,
                backgroundColor: '#393',
                // borderWidth: 1,
                // borderColor: '#303',
                borderRadius: 4,
                overflow: 'hidden',
            }}
        >
            <Text
                style={{
                    color: '#fff',
                    fontSize: 20,
                    fontWeight: 700,
                    textAlign: 'center',
                }}
            >
                {label}
            </Text>

        </View>
    </Pressable>
)

const FatButtonNav = ({ onButtonPressed, numCols = 2 }) => {

    const [maxWidth, setMaxWidth] = useState(null)
    const buttonSize = useMemo(() => maxWidth && maxWidth / numCols, [maxWidth])

    const onLayout = e => {
        if (e.nativeEvent.target.offsetParent) {
            setMaxWidth(e.nativeEvent.target.offsetParent.clientWidth)
        }
    }

    return (
        <View
            onLayout={onLayout}
            style={{
                flex: 1,
            }}
        >
            {maxWidth && (
                <View
                    style={{
                        flexDirection:'row',
                        flexWrap: 'wrap',
                    }}
                >
                    <FatButton
                        label='Bips'
                        size={buttonSize}
                        onPress={() => onButtonPressed('Bips')}
                    />

                    <FatButton
                        label='Work'
                        size={buttonSize}
                        onPress={() => onButtonPressed('Work')}
                    />

                    <FatButton
                        label='Play'
                        size={buttonSize}
                        onPress={() => onButtonPressed('Play')}
                    />

                    <FatButton
                        label='Simple'
                        size={buttonSize}
                        onPress={() => onButtonPressed('Simple')}
                    />

                    <FatButton
                        label='Forum'
                        size={buttonSize}
                        onPress={() => onButtonPressed('Forum')}
                    />

                    <FatButton
                        label='Feed'
                        size={buttonSize}
                        onPress={() => onButtonPressed('Feed')}
                    />

                </View>
            )}
        </View>
    )
}

export default FatButtonNav