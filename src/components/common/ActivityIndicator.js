import React from 'react'
import { View } from 'react-native'
import { TextCopy } from '@components'
import { ActivityIndicator as Indicator } from 'react-native-paper'

const ActivityIndicator = ({ size = 'large', color = 'tomato', label = null, ...props }) => (
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
                <TextCopy
                    color={color}
                    size={24}
                    align='center'
                >
                    {label}
                </TextCopy>
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