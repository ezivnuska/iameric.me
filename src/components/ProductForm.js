import React, { useContext, useEffect, useMemo, useState } from 'react'
import {
    View,
} from 'react-native'
import {
    CategoryPicker,
    FormInput,
    IconButton,
    ImageFormModule,
} from '.'
import axios from 'axios'
import { AppContext } from '../AppContext'
import classes from '../styles/classes'

const IMAGE_PATH = __DEV__ ? 'https://iameric.me/assets' : '/assets'

export default  ({ product }) => {
    
    const {
        dispatch,
        loading,
        user,
    } = useContext(AppContext)

    const original = useMemo(() => product, [product])

    const initialState = {
        title: '',
        price: '',
        blurb: '',
        desc: '',
        category: 'main',
        image: null,
        attachment: null,
    }

    // const [formData, setFormData] = useState(initialState)
    const [title, setTitle] = useState('')
    const [price, setPrice] = useState('')
    const [blurb, setBlurb] = useState('')
    const [desc, setDesc] = useState('')
    const [category, setCategory] = useState('main')
    const [image, setImage] = useState(null)
    const [attachment, setAttachment] = useState(null)

    // let formData = {
    //     vendor: user._id,
    //     title,
    //     price,
    //     blurb,
    //     desc,
    //     category,
    //     image,
    //     attachment,
    // }

    const onChangeTitle = value => setTitle(value)
    const onChangePrice = value => setPrice(value)
    const onChangeBlurb = value => setBlurb(value)
    const onChangeDesc = value => setDesc(value)
    const onChangeCategory = value => setCategory(value)

    // useEffect(() => {
    //     setFormData({ title, price, category, blurb, desc, image, attachment })
    // }, [title, price, category, blurb, desc, image, attachment])
    
    // useEffect(() => {
    //     console.log('product-->', product)
    //     updateFormData(initialState)
    // }, [])
    
    useEffect(() => {
        // if editing, set initial form vars
        updateFormData(product || initialState)
    }, [])

    // useEffect(() => {
    //     console.log('initial product data', productData)
    //     if (productData) {
    //         setInitialState(productData)
    //     }
    // }, [])

    useEffect(() => {
        console.log('title changed', title)
    }, [title])
    
    // useEffect(() => {
    //     // if editing, set initial form vars
    //     if (productData) {
    //         setFormData(productData)
    //     }
    // }, [productData])

    // useEffect(() => {
    //     console.log('formData changed', formData)
    //     dispatch({ type: 'SET_PRODUCT', productData: formData })
    // }, [formData])

    const updateFormData = data => {
        console.log('data', data)
        setTitle(data.title)
        setPrice(data.price)
        setBlurb(data.blurb)
        setDesc(data.desc)
        setCategory(data.category)
        setImage(data.image)
        // setFormData(data)

        // dispatch({ type: 'SET_PRODUCT', productData: ({
        //     _id: data._id,
        //     vendor: user._id,
        //     title: data.title,
        //     price: data.price,
        //     blurb: data.blurb,
        //     desc: data.desc,
        //     category: data.category,
        //     image: data.image,
        // })})
    }

    const resetForm = () => {
        if (product) {
            updateFormData(product)
        } else {
            clearForm()
        }
    }

    const clearForm = () => {
        setTitle('')
        setPrice('')
        setDesc('')
        setBlurb('')
        setCategory('main')
        setImage(null)
        setAttachment(null)
    }

    const onSubmit = async () => {
        
        dispatch({ type: 'SET_LOADING', loading: 'Submitting product...' })

        const { _id } = user

        let newProduct = {
            vendor: _id,
            title,
            price,
            blurb,
            desc,
            category,
            image,
        }

        if (product) {
            newProduct = {
                ...newProduct,
                _id: product._id,
            }
        }

        if (attachment) {
            newProduct = {
                ...newProduct,
                attachment,
            }
        }

        const { data } = await axios
            .post('/api/product', newProduct)

            
        if (!data) {
            console.log('Error saving product', data)
        } else {
            dispatch({
                type: product
                    ? 'ADD_PRODUCT'
                    : 'UPDATE_PRODUCT',
                product: data,
            })
        }
        
        clearForm()
        
        dispatch({ type: 'SET_LOADING', loading: null })
    }

    const removeImage = () => {
        if (attachment) {
            setAttachment(null)
        } else if (image) setImage(null)
    }

    const renderImageFormModule = () => {
        
        const uri = attachment
            ? attachment.thumbData.uri
            : image
                ? `${IMAGE_PATH}/${user.username}/thumb/${image.filename}`
                :  null

        return (
            <ImageFormModule
                onImageSelected={setAttachment}
                removeImage={removeImage}
                uri={uri}
            />
        )
    }

    return (
        <View
            style={[
                classes.formContainer,
                { paddingTop: 20 },
            ]}
        >

            <CategoryPicker
                style={{ marginBottom: 10 }}
                label='Category'
                onChange={onChangeCategory}
                category={category}
                disabled={loading}
            />

            {renderImageFormModule()}
            
            <FormInput
                label='Name'
                value={title}
                onChangeText={onChangeTitle}
                placeholder='product name'
                textContentType='default'
                autoCapitalize='true'
                keyboardType='default'
                disabled={loading}
            />

            <FormInput
                label='Price'
                value={price}
                onChangeText={onChangePrice}
                placeholder='0.00'
                keyboardType='decimal-pad'
                disabled={loading}
            />

            <FormInput
                label='Blurb'
                value={blurb}
                onChangeText={onChangeBlurb}
                placeholder='blurb'
                keyboardType='default'
                multiline
                disabled={loading}
            />

            <FormInput
                label='Description'
                value={desc}
                onChangeText={onChangeDesc}
                placeholder='description'
                keyboardType='default'
                multiline
                disabled={loading}
            />

            <IconButton
                type='primary'
                label='Save'
                onPress={onSubmit}
                disabled={
                    loading
                    || (title && !title.length)
                    || (price && !price.length)
                }
                style={{ marginVertical: 5 }}
            />

            <IconButton
                label={product ? 'Reset Form' : 'Clear Form'}
                onPress={resetForm}
                disabled={loading}
                style={{ marginVertical: 5 }}
            />

        </View>
    )
}