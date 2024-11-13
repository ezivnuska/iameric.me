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

const FatButtonNav = ({ navigateTo, numCols = 2 }) => {

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
                    {/* <FatButton
                        label='Bips'
                        size={buttonSize}
                        onPress={() => navigateTo('Bips')}
                    /> */}

                    <FatButton
                        label='Work'
                        size={buttonSize}
                        onPress={() => navigateTo('Work')}
                    />

                    <FatButton
                        label='Play'
                        size={buttonSize}
                        onPress={() => navigateTo('Play')}
                    />

                    <FatButton
                        label='Simple'
                        size={buttonSize}
                        onPress={() => navigateTo('Simple')}
                    />

                    <FatButton
                        label='Forum'
                        size={buttonSize}
                        onPress={() => navigateTo('Forum')}
                    />

                    <FatButton
                        label='Feed'
                        size={buttonSize}
                        onPress={() => navigateTo('Feed')}
                    />

                </View>
            )}
        </View>
    )
}

export default FatButtonNav