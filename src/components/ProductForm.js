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
import main from '../styles/main'

const IMAGE_PATH = __DEV__ ? 'https://iameric.me/assets' : '/assets'

export default  ({ onComplete, onDelete, existingProduct = null }) => {
    
    const {
        user,
        dispatch,
    } = useContext(AppContext)

    const [loading, setLoading] = useState(false)
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
    const onChangeCategory = value => setCategory(value)
    
    useEffect(() => {
        // if editing, set initial form vars
        if (existingProduct) {
            setFormData(existingProduct)
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

    const onSubmit = async () => {
        
        setLoading(true)

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

        if (existingProduct) {
            productData = {
                ...productData,
                _id: existingProduct._id,
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

        setLoading(false)

        if (!data) {
            console.log('Error saving product', data)
            return null
        }
        
        if (!existingProduct) {
            dispatch({ type: 'ADD_PRODUCT', product: data })
        } else {
            dispatch({ type: 'UPDATE_PRODUCT', product: data })
        }

        setTitle('')
        setPrice('')
        setDesc('')
        setBlurb('')
        setCategory('')
        setImage(null)
        setAttachment(null)

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
        <View style={[main.form, { width: '100%' }]}>

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
                style={main.input}
                disabled={loading}
            />

            <FormInput
                label='Price'
                value={price || ''}
                onChangeText={onChangePrice}
                placeholder='0.00'
                keyboardType='decimal-pad'
                style={main.input}
                disabled={loading}
            />

            <FormInput
                label='Blurb'
                value={blurb || ''}
                onChangeText={onChangeBlurb}
                placeholder='blurb'
                keyboardType='default'
                multiline
                style={[main.input, main.textArea]}
                disabled={loading}
            />

            <FormInput
                label='Description'
                value={desc || ''}
                onChangeText={onChangeDesc}
                placeholder='description'
                keyboardType='default'
                multiline
                style={[main.input, main.textArea]}
                disabled={loading}
            />

            <IconButton
                label='Save'
                onPress={onSubmit}
                disabled={loading || (title && !title.length) || (price && !price.length)}
                bgColor='blue'
            />

            <IconButton
                label='Delete'
                onPress={onDelete}
                disabled={loading}
                bgColor='red'
            />

        </View>
    )
}