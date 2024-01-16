import React from 'react'
import {
    Pressable,
    Text,
    View,
} from 'react-native'
import classes from '../styles/classes'
import Icon from 'react-native-vector-icons/Ionicons'

export default ({ onPress, disabled, label, iconName = null }) => (
    <View
        style={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'flex-start',
            alignItems: 'center',
            paddingVertical: 5,
            backgroundColor: 'transparent',
            textAlign: 'center',
            // marginVertical: 10,
            // borderWidth: 1,
            // borderColor: 'yellow',
        }}
    >
        {label && (
            <Text
                style={[
                    classes.headerSecondary,
                    { flexBasis: 'auto', flexGrow: 0 },
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
                        { flexBasis: 'auto', flexShrink: 1, marginLeft: 5, lineHeight: 2 },
                        classes.headerSecondary,
                    ]}
                />
            </Pressable>
        )}
    </View>
) 