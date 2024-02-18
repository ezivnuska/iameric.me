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

export default  ({ onComplete, onDelete }) => {
    
    const {
        dispatch,
        loading,
        product,
        user,
    } = useContext(AppContext)

    const [ title, setTitle ] = useState()
    const [ price, setPrice ] = useState()
    const [ blurb, setBlurb ] = useState()
    const [ desc, setDesc ] = useState()
    const [ category, setCategory ] = useState()
    const [ image, setImage ] = useState(null)
    const [ attachment, setAttachment ] = useState(null)

    const onChangeTitle = value => setTitle(value)
    const onChangePrice = value => setPrice(value)
    const onChangeBlurb = value => setBlurb(value)
    const onChangeDesc = value => setDesc(value)
    const onChangeCategory = value => {
        console.log('setting category...', value)
        setCategory(value)
    }
    
    useEffect(() => {
        // if editing, set initial form vars
        console.log('product...', product)
        if (product) {
            setFormData(product)
        }
    }, [])

    const setFormData = data => {
        setTitle(data.title)
        setPrice(data.price)
        setBlurb(data.blurb)
        setDesc(data.desc)
        setCategory(data.category)
        setImage(data.image)
    }

    const resetForm = () => {
        if (product) {
            setFormData(product)
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
        
        let productData = {
            vendor: _id,
            title,
            price,
            blurb,
            desc,
            category,
            image,
        }

        if (product) {
            productData = {
                ...productData,
                _id: featured._id,
            }
        }

        if (attachment) {
            productData = {
                ...productData,
                attachment,
            }
        }

        const { data } = await axios
            .post('/api/product', productData)

            dispatch({ type: 'SET_LOADING', loading: null })

        if (!data) {
            console.log('Error saving product', data)
            return null
        }
        
        if (!product) {
            dispatch({ type: 'ADD_PRODUCT', product: data })
        } else {
            dispatch({ type: 'UPDATE_PRODUCT', product: data })
        }
        
        clearForm()

        onComplete(data)
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
                { width: '100%' },
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
                disabled={loading || (title && !title.length) || (price && !price.length)}
            />

            <IconButton
                label={product ? 'Reset Form' : 'Clear Form'}
                onPress={resetForm}
                disabled={loading}
            />

        </View>
    )
}