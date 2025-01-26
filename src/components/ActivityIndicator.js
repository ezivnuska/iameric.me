import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { ActivityIndicator as Indicator } from 'react-native-paper'
// import { useTheme } from '@context'

const ActivityIndicator = ({
    size = 'medium',
    label = null,
    // ...props
}) => {
    // const { styles, theme } = useTheme()
    return (
        <View style={styles.container}>

            <View style={styles.content}>

                {label && (
                    <Text style={styles.label}>
                        {label}
                    </Text>
                )}

                <Indicator
                    size={size}
                    // color={theme.colors.text.primary}
                    // style={{ marginHorizontal: 'auto' }}
                />
            </View>
        </View>
    )
}

export default ActivityIndicator

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
    },
    content: {
        gap: 10,
        // marginHorizontal: 'auto',
        alignContent: 'center',
    },
    label: {
        // color: theme.colors.text.primary,
        fontSize: 24,
        textAlign: 'center',
    },
})