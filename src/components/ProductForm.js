import React, { useContext, useState } from 'react'
import {
    Text,
    View
} from 'react-native'
import axios from 'axios'
import { AppContext } from '../AppContext'
import defaultStyles from '../styles/main'
import {
    ButtonPrimary,
    CategoryPicker,
    FormInput,
} from '.'

const ProductForm = ({ onComplete, onDelete, product = null }) => {

    const {
        state,
        dispatch,
    } = useContext(AppContext)

    const { user } = state

    const [loading, setLoading] = useState(false)

    const [ title, setTitle ] = useState(product ? product.title : '')
    const [ price, setPrice ] = useState(product ? product.price : '')
    const [ blurb, setBlurb ] = useState(product ? product.blurb : '')
    const [ desc, setDesc ] = useState(product ? product.desc : '')
    const [ category, setCategory ] = useState(product ? product.category : '')

    const onChangeTitle = value => setTitle(value)
    const onChangePrice = value => setPrice(value)
    const onChangeDesc = value => setDesc(value)
    const onChangeBlurb = value => setBlurb(value)
    const onChangeCategory = value => setCategory(value)

    const onSubmit = async () => {

        const { _id, role, username } = user
        
        let newProduct = {
            vendor: _id,
            title,
            price,
            blurb,
            desc,
            category,
        }

        if (product) newProduct = {
            ...newProduct,
            _id: product._id,
        }
        
        setLoading(true)

        const { data } = await axios.
            post('/api/product', newProduct)

        setLoading(false)

        if (!data) {
            console.log('Error saving product')
            return
        }

        setTitle('')
        setPrice('')
        setDesc('')
        setBlurb('')
        setCategory('')
        
        onComplete(data.item)
    }

    return (
        <View style={defaultStyles.form}>

            <CategoryPicker
                style={{ marginBottom: 10 }}
                label='Category'
                onChange={onChangeCategory}
            />
            
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
                label='Blurb'
                value={blurb}
                onChangeText={onChangeBlurb}
                placeholder='blurb'
                keyboardType='default'
                multiline
                style={[defaultStyles.input, defaultStyles.textArea]}
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
                label='Save'
                disabled={loading || !title.length || !price.length}
                onPress={onSubmit}
            />

            <ButtonPrimary
                label='Delete'
                disabled={loading}
                onPress={() => onDelete(product._id)}
            />

        </View>
    )
}

export default ProductForm