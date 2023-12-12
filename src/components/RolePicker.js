import React, { useEffect, useState } from 'react'
import { Picker } from '@react-native-picker/picker'

const Item = ({label, value}) => (
    <Picker.Item
        label={label}
        value={value}
    />
)

const RolePicker = ({ onChange }) => {
    const [selectedRole, setSelectedRole] = useState('driver')

    useEffect(() => {
        if (selectedRole) onChange(selectedRole)
    }, [selectedRole])
    
    return (
        <Picker
            selectedValue={selectedRole}
            onValueChange={(itemValue, itemIndex) => setSelectedRole(itemValue)}
            style={{
                background: '#000',
                marginBottom: 15,
                fontSize: 20,
                lineHeight: 24,
                color: '#fff',
                padding: 0,
                borderWidth: 0,
            }}
        >
            <Item label='Driver' value='driver' />
            <Item label='Vendor' value='vendor' />
            <Item label='Customer' value='customer' />
        </Picker>
    )
}

export default RolePicker