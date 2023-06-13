import React, { useContext, useState } from 'react'
import {
    // StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View
} from 'react-native'
import axios from 'axios'
import { AppContext } from '../AppContext'
import defaultStyles from '../styles'
import ButtonPrimary from './ButtonPrimary'
import FormInput from './FormInput'

const MenuItemForm = ({ addItem, updateStatus }) => {

    const {
        state,
        dispatch,
    } = useContext(AppContext)

    const { user } = state
    const [ itemName, setItemName ] = useState('')
    const [ itemPrice, setItemPrice ] = useState('')

    const onChangeItemName = value => setItemName(value)
    const onChangeItemPrice = value => setItemPrice(value)

    const onSubmit = () => {
        const { username, _id } = user
        const newItem = {
            username,
            merchantId: _id,
            name: itemName,
        }
        addItem(newItem)
        
        axios
            .post('/api/item', newItem)
            .then(({ data }) => {
                updateStatus('Sent!')
                // dispatch({ type: 'NEW_ENTRY', entry: data.entry })
                setItem('')
            })
            .catch(err => {
                updateStatus('Error saving item.')
                console.log('Error saving item', err)
            })
    }

    return (
        <View style={defaultStyles.form}>
            <Text style={defaultStyles.label}>Add Item</Text>
            <FormInput
                label='Item Name'
                value={itemName}
                onChangeText={onChangeItemName}
                placeholder='item name'
                textContentType='default'
                autoCapitalize='true'
                keyboardType='default'
                style={defaultStyles.input}
            />

            <FormInput
                label='Item Price'
                value={itemPrice}
                onChangeText={onChangeItemPrice}
                placeholder='0.00'
                keyboardType='decimal-pad'
                style={defaultStyles.input}
            />

            <ButtonPrimary
                label='Send'
                disabled={!itemName.length && !itemPrice.length}
                onPress={onSubmit}
            />

        </View>
    )
}

export default MenuItemForm

// const styles = StyleSheet.create({

// })