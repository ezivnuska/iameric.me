import React from 'react'
import {
    Pressable,
    Text,
    View,
} from 'react-native'
import classes from '../styles/classes'
import Icon from 'react-native-vector-icons/Ionicons'
import { useApp } from '@context'

export default ({ onPress, disabled, label, iconName = null }) => {

    const { theme } = useApp()

    return (
        <View
            style={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'flex-start',
                alignItems: 'center',
                paddingVertical: 5,
                backgroundColor: 'transparent',
                textAlign: 'center',
            }}
        >
            {label && (
                <Text
                    style={[
                        classes.headerSecondary,
                        {
                            flexBasis: 'auto',
                            flexGrow: 0,
                            color: theme?.colors.textDefault,
                        },
                    ]}
                >
                    {label}
                </Text>
            )}

            {iconName && (
                <Pressable
                    onPress={onPress}
                    disabled={disabled}
                >
                    <Icon
                        name={iconName}
                        size={16}
                        style={[
                            classes.headerSecondary,
                            {
                                flexBasis: 'auto',
                                flexShrink: 1,
                                marginLeft: 5,
                                lineHeight: 2,
                                color: theme?.colors.textDefault,
                            },
                        ]}
                    />
                </Pressable>
            )}
        </View>
    )
}