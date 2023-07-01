import React, { useEffect, useState } from 'react'
import { Picker } from '@react-native-picker/picker'

const RolePicker = ({ onChange }) => {
    const [selectedRole, setSelectedRole] = useState('driver')
    useEffect(() => {
        if (selectedRole) onChange(selectedRole)
    }, [selectedRole])
    
    return (
        <Picker
            selectedValue={selectedRole}
            onValueChange={(itemValue, itemIndex) => setSelectedRole(itemValue)}
        >
            <Picker.Item label='Driver' value='driver' />
            <Picker.Item label='Vendor' value='vendor' />
            <Picker.Item label='Customer' value='customer' />
        </Picker>
    )
}

export default RolePicker