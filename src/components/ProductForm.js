import React, { useContext, useEffect, useState } from 'react'
import {
    Image,
    View,
} from 'react-native'
import {
    ButtonPrimary,
    CategoryPicker,
    FormInput,
    ImageLoader,
    // ImagePreview,
    NewImageUploader,
} from '.'
import axios from 'axios'
import { AppContext } from '../AppContext'
import main from '../styles/main'

const IMAGE_PATH = __DEV__ ? 'https://www.iameric.me/assets' : '/assets'

export default ({ onComplete, onDelete, existingProduct = null }) => {
    
    const {
        state,
        dispatch,
    } = useContext(AppContext)

    const { user } = state

    const [loading, setLoading] = useState(false)
    // const [ product, setProduct ] = useState(null)
    const [ title, setTitle ] = useState('')
    const [ price, setPrice ] = useState('')
    const [ blurb, setBlurb ] = useState('')
    const [ desc, setDesc ] = useState('')
    const [ category, setCategory ] = useState('')
    // const [ image, setImage ] = useState(null)
    const [ imageId, setImageId ] = useState(null)
    const [ filename, setFilename ] = useState(null)
    const [ path, setPath ] = useState(null)

    const onChangeTitle = value => setTitle(value)
    const onChangePrice = value => setPrice(value)
    const onChangeBlurb = value => setBlurb(value)
    const onChangeDesc = value => setDesc(value)
    const onChangeCategory = value => setCategory(value)
    
    useEffect(() => {
        // if editing, set initial form vars
        if (existingProduct) {
            console.log('form initiated with existing product:', existingProduct.title)

            setTitle(existingProduct.title || '')
            setPrice(existingProduct.price || '')
            setBlurb(existingProduct.blurb || '')
            setDesc(existingProduct.desc || '')
            setCategory(existingProduct.category || '')
            setImageId(existingProduct.imageId)
        }

    }, [])

    useEffect(() => {
        if (user) {
            if (!path) setPath(`${IMAGE_PATH}/${user.username}/thumb/`)
        }
    }, [user])

    const getImageIdFromFilename = async name => {
        console.log('name...', name)
        const { data } = await axios
            .get(`/api/images/${name}`)

        if (!data) {
            console.log('could not fetch image data.')
            return null
        }
        console.log('fetchedImageData:', data)
        
        setImageId(data._id)
    }
    
    const fetchImageById = async id => {

        const { data } = await axios
            .get(`/api/images/${id}`)

        if (!data) {
            console.log('could not fetch image data.')
            return null
        }
        console.log('fetchedImageData:', data)
        if (existingProduct) {
            if (existingProduct.filename && existingProduct.filename !== data.filename) {
                setImageId(data.imageId)
                setFilename(data.filename)
            }
        }
        
        if (
            (existingProduct && existingProduct.filename) &&
            (existingProduct.filename !== data.filename)
        ) {
            console.log('setting filename for new image.', data)
            setFilename(data.filename)
        }

        console.log('done fetching image data.')
    }

    const onSubmit = async () => {

        const { _id, role, username } = user
        
        let productData = {
            vendor: _id,
            title,
            price,
            blurb,
            desc,
            category,
            imageId,
        }

        if (existingProduct && existingProduct._id) productData = {
            ...productData,
            _id: existingProduct._id,
        }

        if (filename) productData = {
            ...productData,
            filename,
        }
        
        setLoading(true)

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

    const onImageUploaded = name => {
        console.log('filename set after image upload', name)
        setFilename(name)
    }

    return (
        <View style={[main.form, { width: '100%' }]}>

            <CategoryPicker
                style={{ marginBottom: 10 }}
                label='Category'
                onChange={onChangeCategory}
                category={category}
            />

            {path && filename
                ? (
                    // <ImagePreview
                    //     path={`${IMAGE_PATH}/${user.username}/thumb/${filename}`}
                    // />
                    <Image
                        style={{
                            width: 50,
                            height: 50,
                            resizeMode: 'stretch',
                        }}
                        source={`${path}/${filename}`}
                    />
                )
                : (existingProduct && existingProduct.imageId)
                ? (
                    <ImageLoader
                        // style={{
                        //     width: 50,
                        //     height: 50,
                        //     resizeMode: 'stretch',
                        // }}
                        image={existingProduct.imageId}
                    />
                )
                : (
                    <NewImageUploader
                        onImageUploaded={onImageUploaded}
                    />
                )
            }
            
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
                onPress={() => onDelete(existingProduct._id)}
            />

        </View>
    )
}