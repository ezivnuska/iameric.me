import React, { useEffect, useState } from 'react'
import {
    StyleSheet,
    Text,
    View,
} from 'react-native'
import {
    ButtonPrimary,
} from '.'

const RolePicker = ({ onChange, value }) => {

    const [current, setCurrent] = useState(value)

    useEffect(() => {
        onChange(current)
    }, [current])

    const handleChange = type => {
        setCurrent(type)
    }

    return (
        <View style={styles.container}>
            <ButtonPrimary
                label='Driver'
                onPress={() => handleChange('driver')}
                style={styles.option}
                disabled={value === 'driver'}
            />
            <ButtonPrimary
                label='User'
                onPress={() => handleChange('user')}
                style={styles.option}
                disabled={value === 'user'}
            />
            <ButtonPrimary
                label='Merchant'
                onPress={() => handleChange('merchant')}
                style={styles.option}
                disabled={value === 'merchant'}
            />
        </View>
    )
}

export default RolePicker

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        flexDirection: 'row',
    },
    option: {
        flex: 1,
        borderWidth: 1,
        borderColor: 'red',
    },
})