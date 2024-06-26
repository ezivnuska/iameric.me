import React, { useState, useEffect } from 'react'
import {
    Pressable,
    View,
} from 'react-native'
import {
    IconButton,
    ThemedText,
} from '@components'
import {
    useApp,
} from '@context'
import { addDeposit, withdrawDeposit } from '@utils/user'
import Icon from 'react-native-vector-icons/Ionicons'
import { classes } from '@styles'

export default ({ user }) => {

    const {
        userLoading,
        setUserLoading,
        addToDeposit,
        clearDeposit,
        theme,
    } = useApp()

    // useEffect(() => {
    //     if (value <= increment) setError(`nothing doesn't exist`)
    //     else if (error) setError(null)
    // }, [value])

    const increment = 5
    const [value, setValue] = useState(increment)
    // const [error, setError] = useState(null)

    const increase = () => setValue(value + increment)
    const decrease = () => setValue(value - increment)

    const submitForm = async () => {
        setUserLoading(true)
        await addDeposit(user._id, value)
        setUserLoading(false)
        addToDeposit(value)
        setValue(increment)
    }

    const withdraw = async () => {
        setUserLoading(true)
        await withdrawDeposit(user._id)
        setUserLoading(false)
        clearDeposit()
        setValue(increment)
    }
    
    return (
        <View>
            <ThemedText style={classes.headerSecondary}>Deposit</ThemedText>
            <View
                style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                }}
            >
                <ThemedText>{`Current Deposit: $${Number(user.deposit).toFixed(2)}`}</ThemedText>
                <ThemedText>{`New Deposit: $${Number(user.deposit + value).toFixed(2)}`}</ThemedText>
            </View>

            <View
                style={{
                    flexDirection: 'row',
                    justifyContent: 'center',
                    alignItems: 'center',
                    gap: 15,
                    marginVertical: 10,
                }}
            >
                <Pressable
                    onPress={decrease}
                    disabled={value === increment}
                    style={{
                        opacity: value === increment ? 0.5 : 1,
                    }}
                >
                    <Icon
                        name='remove-circle-outline'
                        size={32}
                        color={theme?.colors.textDefault}
                    />
                </Pressable>

                <ThemedText size={24} bold>{`$${Number(value).toFixed(2)}`}</ThemedText>

                <Pressable
                    onPress={increase}
                >
                    <Icon
                        name='add-circle-outline'
                        size={32}
                        color={theme?.colors.textDefault}
                    />
                </Pressable>
            </View>

            {/* {error && <ThemedText style={{ textColor: 'red' }}>{error}</ThemedText>} */}
            
            <View
                style={{
                    flexDirection: 'row',
                    justifyContent: 'space-evenly',
                    gap: 10,
                }}
            >
                <IconButton
                    label={`Add $${Number(value).toFixed(2)}`}
                    onPress={submitForm}
                    disabled={userLoading || value < increment}
                    textStyles={{ color: '#fff' }}
                    style={{ flex: 1 }}
                />
                <IconButton
                    label={`Withdraw $${Number(user.deposit).toFixed(2)}`}
                    onPress={withdraw}
                    disabled={userLoading || user.deposit === 0}
                    textStyles={{ color: '#fff' }}
                    style={{ flex: 1 }}
                />
            </View>
        </View>
    )
}