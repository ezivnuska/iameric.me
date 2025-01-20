import React from 'react'
import { Text, View } from 'react-native'
import { ActivityIndicator as Indicator } from 'react-native-paper'

const ActivityIndicator = ({
    size = 'medium',
    color = 'tomato',
    label = null,
    ...props
}) => (
    <View
        {...props}
        style={{
            flex: 1,
            flexDirection: 'row',
            alignItems: 'center',
        }}
    >
        <View
            style={{
                gap: 10,
                marginHorizontal: 'auto',
            }}
        >
            {label && (
                <Text style={[styles.text, styles.copy, { color, fontSize: 24, textAlign: 'center' }]}>
                    {label}
                </Text>
            )}

            <Indicator
                size={size}
                color={color}
                style={{ marginHorizontal: 'auto' }}
            />
        </View>
    </View>
)

export default ActivityIndicator