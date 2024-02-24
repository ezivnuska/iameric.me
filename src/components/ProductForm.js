import React, { useContext, useEffect, useState } from 'react'
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

export default  () => {
    
    const {
        dispatch,
        loading,
        productData,
        user,
    } = useContext(AppContext)

    const [initialState, setInitialState] = useState(null)
    const [title, setTitle] = useState()
    const [price, setPrice] = useState()
    const [blurb, setBlurb] = useState()
    const [desc, setDesc] = useState()
    const [category, setCategory] = useState()
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

    useEffect(() => {
        setFormData({ title, price, category, blurb, desc, image, attachment })
    }, [title, price, category, blurb, desc, image, attachment])
    
    // useEffect(() => {
    //     // if editing, set initial form vars
    //     console.log('INIT_PRODUCT_FORM', productData)
    //     if (product) {
    //         console.log('DATA', product)
    //         setInitialState(product)
    //         setFormData(product)
    //     }
    // }, [])
    
    useEffect(() => {
        // if editing, set initial form vars
        if (productData) {
            if (!initialState) {
                // console.log('PRODUCT_DATA', productData)
                setInitialState(productData)
                setFormData(productData)
            }
        }
    }, [productData])

    // useEffect(() => {
    //     console.log('formData changed', formData)
    //     dispatch({ type: 'SET_PRODUCT', productData: formData })
    // }, [formData])

    const setFormData = data => {
        // console.log('data', data)
        setTitle(data.title)
        setPrice(data.price)
        setBlurb(data.blurb)
        setDesc(data.desc)
        setCategory(data.category)
        setImage(data.image)

        dispatch({ type: 'SET_PRODUCT', productData: ({
            _id: data._id,
            vendor: user._id,
            title: data.title,
            price: data.price,
            blurb: data.blurb,
            desc: data.desc,
            category: data.category,
            image: data.image,
        })})
    }

    const resetForm = () => {
        if (initialState) {
            setFormData(initialState)
        } else {
            clearForm()
        }
    }

    const clearForm = () => {
        setTitle('')
        setPrice('')
        setDesc('')
        setBlurb('')
        setCategory('')
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

        if (initialState._id) {
            newProduct = {
                ...newProduct,
                _id: initialState._id,
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
            if (!initialState._id) {
                dispatch({ type: 'ADD_PRODUCT', product: data })
            } else {
                dispatch({ type: 'UPDATE_PRODUCT', product: data })
            }
        }
        
        clearForm()
        
        dispatch({ type: 'SET_LOADING', loading: null })

        // dispatch({ type: 'CLOSE_MODAL' })
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
        <View style={classes.formContainer}>

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
                value={title || ''}
                onChangeText={onChangeTitle}
                placeholder='product name'
                textContentType='default'
                autoCapitalize='true'
                keyboardType='default'
                disabled={loading}
            />

            <FormInput
                label='Price'
                value={price || ''}
                onChangeText={onChangePrice}
                placeholder='0.00'
                keyboardType='decimal-pad'
                disabled={loading}
            />

            <FormInput
                label='Blurb'
                value={blurb || ''}
                onChangeText={onChangeBlurb}
                placeholder='blurb'
                keyboardType='default'
                multiline
                disabled={loading}
            />

            <FormInput
                label='Description'
                value={desc || ''}
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
            />

            <IconButton
                label={initialState ? 'Reset Form' : 'Clear Form'}
                onPress={resetForm}
                disabled={loading}
            />

        </View>
    )
}