import React, { useState } from 'react'
import {
    ActivityIndicator,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native'

const CircleButton = ({ children, disabled, onPress }) => {
    
    const [loading, setLoading] = useState(false)

    const handlePress = () => {
        onPress()
    }
    
    return (
        <TouchableOpacity
            style={[styles.container, (disabled ? styles.disabled : '')]}
            onPress={handlePress}
            disabled={disabled}
        >
            <View style={[styles.loader, (loading ? styles.loading : '')]}>
                <ActivityIndicator size='large' />
            </View>
            <Text style={styles.icon}>
                {children}
            </Text>
    
        </TouchableOpacity>
    )
}

export default CircleButton

const styles = StyleSheet.create({
    container: {
        position: 'relative',
        width: 48,
        height: 48,
        overflow: 'hidden',
        borderRadius: '50%',
        backgroundColor: '#f00',
        textAlign: 'center',
    },
    loader: {
        position: 'absolute',
        top: 0,
        left: 0,
        width: 48,
        height: 48,
        zIndex: 10,
        display: 'none',
    },
    loading: {
        display: 'flex',
    },
    icon: {
        position: 'absolute',
        top: 3,
        left: 0,
        marginHorizontal: 'auto',
        width: 48,
        height: 48,
        textColor: '#fff',
        lineHeight: 47,
        zIndex: 5,
    },
    disabled: {
        opacity: 0.5,
    },
})