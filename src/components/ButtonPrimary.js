import React from 'react'
import {
    Text,
    TouchableOpacity,
} from 'react-native'
import defaultStyles from '../styles'

const ButtonPrimary = ({ label, onPress, altLabel = null, disabled = false }) => {
    
    const handlePress = async () => {
        // do stuff
        onPress()
    }

    return (
        <TouchableOpacity
            style={[defaultStyles.button, disabled ? defaultStyles.buttonDisabled : null]}
            onPress={handlePress}
            disabled={disabled}
        >
            <Text style={[defaultStyles.buttonLabel, disabled ? defaultStyles.buttonLabelDisabled : null]}>
                {disabled ? altLabel || label : label}
            </Text>
            
        </TouchableOpacity>
    )
}

export default ButtonPrimary