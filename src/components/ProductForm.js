import React, { useContext, useEffect, useState } from 'react'
import {
    ImageLoader,
    View,
} from 'react-native'
import {
    ButtonPrimary,
    CategoryPicker,
    FormInput,
    ImagePreview,
    NewImageUploader,
} from '.'
import axios from 'axios'
import { AppContext } from '../AppContext'
import main from '../styles/main'
const IMAGE_PATH = __DEV__ ? 'https://www.iameric.me/assets' : '/assets'

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
    const [ filename, setFilename ] = useState(null)

    const onChangeTitle = value => setTitle(value)
    const onChangePrice = value => setPrice(value)
    const onChangeDesc = value => setDesc(value)
    const onChangeBlurb = value => setBlurb(value)
    const onChangeCategory = value => setCategory(value)

    useEffect(() => {
        // console.log('ProductForm loading with product:', product)
        if (product && product.imageId)
            setImageId(product.imageId)
    }, [])

    const onSubmit = async () => {

        const { _id, role, username } = user
        
        let productData = {
            vendor: _id,
            title,
            price,
            blurb,
            desc,
            category,
            filename,
        }

        if (product) productData = {
            ...productData,
            _id: product._id,
        }
        
        setLoading(true)

        const { data } = await axios
            .post('/api/product', productData)

        setLoading(false)

        if (!data) {
            console.log('Error saving product')
            return null
        }

        if (!product) {
            dispatch({ type: 'ADD_PRODUCT', product: data })
        } else {
            dispatch({ type: 'UPDATE_PRODUCT', product: data })
        }
        
        if (data.imageId)
            dispatch({ type: 'ADD_IMAGE', image: data.imageId })

        setTitle('')
        setPrice('')
        setDesc('')
        setBlurb('')
        setCategory('')
        setFilename(null)

        onComplete(data)
    }

    return (
        <View style={[main.form, { width: '100%' }]}>

            <CategoryPicker
                style={{ marginBottom: 10 }}
                label='Category'
                onChange={onChangeCategory}
            />

            {filename ? (
                <ImagePreview
                    path={`${IMAGE_PATH}/${user.username}/thumb/${filename}`}
                />
            ) : product && product.imageId ? (
                <ImageLoader
                    // style={{
                    //     width: 50,
                    //     height: 50,
                    //     resizeMode: 'stretch',
                    // }}
                    image={product.imageId}
                />
            ) : (
                <NewImageUploader
                    onImageUploaded={name => setFilename(name)}
                />
            )}
            
            <FormInput
                label='Name'
                value={title}
                onChangeText={onChangeTitle}
                placeholder='product name'
                textContentType='default'
                autoCapitalize='true'
                keyboardType='default'
                style={main.input}
            />

            <FormInput
                label='Price'
                value={price}
                onChangeText={onChangePrice}
                placeholder='0.00'
                keyboardType='decimal-pad'
                style={main.input}
            />

            <FormInput
                label='Blurb'
                value={blurb}
                onChangeText={onChangeBlurb}
                placeholder='blurb'
                keyboardType='default'
                multiline
                style={[main.input, main.textArea]}
            />

            <FormInput
                label='Description'
                value={desc}
                onChangeText={onChangeDesc}
                placeholder='description'
                keyboardType='default'
                multiline
                style={[main.input, main.textArea]}
            />

            <ButtonPrimary
                style={main.button}
                label='Save'
                disabled={loading || (title && !title.length) || (price && !price.length)}
                onPress={onSubmit}
            />

            <ButtonPrimary
                style={main.button}
                label='Delete'
                disabled={loading}
                onPress={() => onDelete(product._id)}
            />

        </View>
    )
}

export default ProductForm