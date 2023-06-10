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
    const [ item, setItem ] = useState('')

    const onChangeItem = value => setItem(value)

    const onSubmit = () => {
        const { username, _id } = user
        const newItem = { username, userId: _id, title: item }
        addItem(newItem)
        if (updateStatus) updateStatus('Sending...')
        axios
            .post('/api/menu', newItem)
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
            
            <FormInput
                label='Item Name'
                value={item}
                onChangeText={onChangeItem}
                placeholder='item name'
                textContentType='default'
                autoCapitalize={true}
                keyboardType='default'
                style={defaultStyles.input}
            />

            <ButtonPrimary
                label='Send'
                disabled={!item.length}
                onPress={onSubmit}
            />

        </View>
    )
}

export default MenuItemForm

// const styles = StyleSheet.create({

// })