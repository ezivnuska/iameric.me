import React, { useContext, useEffect, useState } from 'react'
import {
    Image,
    Pressable,
    Text,
    View,
} from 'react-native'
import {
    ButtonPrimary,
    CategoryPicker,
    FormInput,
    ImageUploader,
} from '.'
import axios from 'axios'
import { AppContext } from '../AppContext'
import main from '../styles/main'

const IMAGE_PATH = __DEV__ ? 'https://www.iameric.me/assets' : '/assets'

export default  ({ onComplete, onDelete, existingProduct = null }) => {
    
    const {
        user,
        dispatch,
    } = useContext(AppContext)

    const [loading, setLoading] = useState(false)
    // const [ product, setProduct ] = useState(null)
    const [ title, setTitle ] = useState()
    const [ price, setPrice ] = useState()
    const [ blurb, setBlurb ] = useState()
    const [ desc, setDesc ] = useState()
    const [ category, setCategory ] = useState()
    // const [ image, setImage ] = useState(null)
    const [ image, setImage ] = useState(null)
    // const [ filename, setFilename ] = useState(null)
    // const [ path, setPath ] = useState(null)
    const [ attachment, setAttachment ] = useState(null)
    const [ showSelector, setShowSelector ] = useState(false)

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

    // useEffect(() => {
    //     console.log('attachment changed', attachment)
    //     if (attachment) {
    //         console.log('attachment set', attachment)
    //     }
    // }, [attachment])

    const getProductData = async () => {
        setLoading(true)
        const { data } = await axios.get(`/api/product/${existingProduct}`)
        if (!data) {
            return null
        }
        setFormData(data)
        setLoading(false)
    }

    const setFormData = data => {
        const { title, price, blurb, desc, category } = data
        setTitle(data.title)
        setPrice(data.price)
        setBlurb(data.blurb)
        setDesc(data.desc)
        setCategory(data.category)
        // if (typeof image === '')
        setImage(data.image)
    }

    const onSubmit = async () => {
        // console.log('attachment on submit', attachment)
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

        // console.log('product data after attachment', productData)
        const { data } = await axios
            .post('/api/product', productData)

        setLoading(false)

        if (!data) {
            console.log('Error saving product', data)
            return null
        }
        // console.log('Product Form: data:', data)
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
        // setFilename(null)
        setImage(null)
        setAttachment(null)

        onComplete(data)
    }

    // const onImageUploaded = name => {
    //     console.log('filename set after image upload', name)
    //     setFilename(name)
    // }
    
    const onImageSelected = payload => {
        // console.log('image selected', payload)
        setImage(null)
        // setFilename(null)
        // console.log('setting attachment...', payload)
        setAttachment(payload)
        setShowSelector(false)
        // const { uri, height, width } = data.imageData
    }

    const onAttachmentCancelled = () => {
        setImage(existingProduct.image || null)
        setAttachment(null)
        setShowSelector(false)
    }

    const setImageForDeletion = () => {
        setImage(null)
        setShowSelector(true)
    }

    const renderImage = () => {
        const uri = image
            ? `${IMAGE_PATH}/${user.username}/thumb/${image.filename}`
            : attachment
                ? attachment.thumbData.uri
                : null
        
        return uri ? (
            <Image
                style={{
                    width: 50,
                    height: 50,
                    resizeMode: 'stretch',
                }}
                source={{
                    uri: image
                        ? `${IMAGE_PATH}/${user.username}/thumb/${image.filename}`
                        : attachment
                            ? attachment.thumbData.uri
                            : null
                }}
            />
        ) : null
    }

    const renderControl = () => {
        if (image) {
            return (
                <Pressable
                    onPress={setImageForDeletion}
                    disabled={loading}
                >
                    <Text>Remove Image</Text>
                </Pressable>
            )    
        } else if (attachment) {
            return (
                <Pressable
                    onPress={onAttachmentCancelled}
                    disabled={loading}
                >
                    <Text>Remove Attachment</Text>
                </Pressable>
            )
        } else {
            return (
                <Pressable
                    onPress={() => setShowSelector(true)}
                    disabled={loading}
                >
                    <Text>Upload New Image</Text>
                </Pressable>
            )
        }
    }

    const renderCurrentImage = () => (
        <View>
            {renderImage()}
            {renderControl()}
        </View>
    )

    const renderImageModule = () => (
        <View>
            {!showSelector
                ? renderCurrentImage()
                : (
                    <ImageUploader
                        onImageSelected={onImageSelected}
                        showSubmit={false}
                    />
                )
            }
        </View>
    )

    return (
        <View style={[main.form, { width: '100%' }]}>

            <CategoryPicker
                style={{ marginBottom: 10 }}
                label='Category'
                onChange={onChangeCategory}
                category={category}
            />

            {renderImageModule()}
            
            <FormInput
                label='Name'
                value={title || ''}
                onChangeText={onChangeTitle}
                placeholder='product name'
                textContentType='default'
                autoCapitalize='true'
                keyboardType='default'
                style={main.input}
            />

            <FormInput
                label='Price'
                value={price || ''}
                onChangeText={onChangePrice}
                placeholder='0.00'
                keyboardType='decimal-pad'
                style={main.input}
            />

            <FormInput
                label='Blurb'
                value={blurb || ''}
                onChangeText={onChangeBlurb}
                placeholder='blurb'
                keyboardType='default'
                multiline
                style={[main.input, main.textArea]}
            />

            <FormInput
                label='Description'
                value={desc || ''}
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
                onPress={onDelete}
            />

        </View>
    )
}