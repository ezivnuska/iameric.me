import React, { useContext, useState } from 'react'
import {
    Text,
    View
} from 'react-native'
import axios from 'axios'
import { AppContext } from '../AppContext'
import defaultStyles from '../styles'
import {
    ButtonPrimary,
    FormInput,
} from '.'

const ProductForm = ({ addItem }) => {

    const {
        state,
        dispatch,
    } = useContext(AppContext)

    const { user } = state
    const [ title, setTitle ] = useState('')
    const [ price, setPrice ] = useState('')

    const onChangeTitle = value => setTitle(value)
    const onChangePrice = value => setPrice(value)

    const onSubmit = () => {
        const { _id, role, username } = user
        const newItem = {
            vendorId: _id,
            title,
            price,
        }
        addItem(newItem)
        
        axios
            .post('/api/product', newItem)
            .then(({ data }) => {
                setTitle('')
                setPrice('')
            })
            .catch(err => {
                console.log('Error saving item', err)
            })
    }

    return (
        <View style={defaultStyles.form}>
            <Text style={defaultStyles.label}>Add Product</Text>
            <FormInput
                label='Product Name'
                value={title}
                onChangeText={onChangeTitle}
                placeholder='product name'
                textContentType='default'
                autoCapitalize='true'
                keyboardType='default'
                style={defaultStyles.input}
            />

            <FormInput
                label='Product Price'
                value={price}
                onChangeText={onChangePrice}
                placeholder='0.00'
                keyboardType='decimal-pad'
                style={defaultStyles.input}
            />

            <ButtonPrimary
                label='Add Product'
                disabled={!title.length && !price.length}
                onPress={onSubmit}
            />

        </View>
    )
}

export default ProductForm

// const styles = StyleSheet.create({

// })