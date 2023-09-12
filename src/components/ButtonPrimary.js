import React from 'react'
import {
    Text,
    TouchableOpacity,
} from 'react-native'
import defaultStyles from '../styles/main'

const ButtonPrimary = ({ label, onPress, disabled = false, fontSize = null, ...props }) => {
    
    const handlePress = async () => {
        // do stuff
        onPress()
    }

    return (
        <TouchableOpacity
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
            
        </TouchableOpacity>
    )
}

export default ButtonPrimary