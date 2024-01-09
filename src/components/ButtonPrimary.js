import React from 'react'
import {
    Pressable,
    Text,
} from 'react-native'
import defaultStyles from '../styles/main'
// import classes from '../styles/classes'

export default ({ label, onPress, disabled = false, fontSize = null, ...props }) => {
    
    const handlePress = async () => {
        // do stuff
        onPress()
    }

    return (
        <Pressable
            style={[defaultStyles.button, disabled ? defaultStyles.buttonDisabled : props.style ? props.style : null]}
            onPress={handlePress}
            disabled={disabled}
        >
            <Text style={[
                defaultStyles.buttonLabel,
                disabled ? defaultStyles.buttonLabelDisabled : null,
                fontSize ? { fontSize } : null,
            ]}>
                {label}
            </Text>
            
        </Pressable>
    )
}