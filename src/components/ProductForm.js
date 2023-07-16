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

const ProductForm = ({ onComplete, product = null }) => {

    const {
        state,
        dispatch,
    } = useContext(AppContext)

    const { user } = state
    const [ title, setTitle ] = useState(product ? product.title : '')
    const [ price, setPrice ] = useState(product ? product.price : '')
    const [ desc, setDesc ] = useState(product ? product.desc : '')

    const onChangeTitle = value => setTitle(value)
    const onChangePrice = value => setPrice(value)
    const onChangeDesc = value => setDesc(value)

    const onSubmit = () => {
        const { _id, role, username } = user
        let newProduct = {
            vendorId: _id,
            title,
            price,
            desc,
        }

        if (product) newProduct = {
            ...newProduct,
            _id: product._id,
        }
        
        axios
            .post('/api/product', newProduct)
            .then(({ data }) => {
                setTitle('')
                setPrice('')
                setDesc('')
                onComplete(data.item)
            })
            .catch(err => {
                console.log('Error saving product', err)
            })
    }

    return (
        <View style={defaultStyles.form}>
            
            <Text style={defaultStyles.label}>{`${product ? 'Edit' : 'Add'} Product`}</Text>
            
            <FormInput
                label='Name'
                value={title}
                onChangeText={onChangeTitle}
                placeholder='product name'
                textContentType='default'
                autoCapitalize='true'
                keyboardType='default'
                style={defaultStyles.input}
            />

            <FormInput
                label='Price'
                value={price}
                onChangeText={onChangePrice}
                placeholder='0.00'
                keyboardType='decimal-pad'
                style={defaultStyles.input}
            />

            <FormInput
                label='Description'
                value={desc}
                onChangeText={onChangeDesc}
                placeholder='description'
                keyboardType='default'
                multiline
                style={[defaultStyles.input, defaultStyles.textArea]}
            />

            <ButtonPrimary
                label={`${product ? 'Edit' : 'Add'} Product`}
                disabled={!title.length && !price.length}
                onPress={onSubmit}
            />

        </View>
    )
}

export default ProductForm

// const styles = StyleSheet.create({

// })