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
    ImageFormModule,
    ImageUploader,
} from '.'
import { Button } from 'antd'
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
        // setImage(null)
        // setFilename(null)
        // console.log('setting attachment...', payload)
        setAttachment(payload)
        // setShowSelector(false)
        // const { uri, height, width } = data.imageData
    }

    const removeImage = () => {
        if (attachment) {
            setAttachment(null)
        } else if (image) setImageForDeletion()
    }

    const onAttachmentCancelled = () => {
        // setImage(existingProduct.image || null)
        setAttachment(null)
        // setShowSelector(false)
    }

    const setImageForDeletion = () => {
        setImage(null)
        // setShowSelector(true)
    }

    const renderImageFormModule = () => {
        
        const uri = attachment
            ? attachment.thumbData.uri
            : image
                ? `${IMAGE_PATH}/${user.username}/thumb/${image.filename}`
                :  null

        return (
            <ImageFormModule
                // onImageUpdated={onImageUpdated}
                onImageSelected={onImageSelected}
                removeImage={removeImage}
                uri={uri}
            />
        )
    }
    
    const renderImage = () => {
        
        const uri = image
            ? `${IMAGE_PATH}/${user.username}/thumb/${image.filename}`
            : attachment
                ? attachment.thumbData.uri
                : null
        
        return uri ? (
            <View
                style={{
                    paddingRight: 10,
                }}
            >
                <Image
                    source={{ uri }}
                    style={{
                        width: 50,
                        height: 50,
                        resizeMode: 'stretch',
                    }}
                />
            </View>
        ) : null
    }

    const renderControls = () => (
        <View
            style={{
                borderWidth: 1,
                borderStyle: 'dotted',
            }}
        >
            
            {image ? (
                <Button
                    type='primary'
                    size='small'
                    onClick={setImageForDeletion}
                    >
                    <Text>Remove Image</Text>
                </Button>
            ) : attachment ? (
                <Pressable
                onPress={onAttachmentCancelled}
                disabled={loading}
                >
                    <Text>Remove Attachment</Text>
                </Pressable>
            ) : (
                <ImageUploader
                    onImageSelected={onImageSelected}
                    showSubmit={false}
                />
            )}
        </View>
    )

    const renderImageModule = () => (
        <View
            style={{
                marginVertical: 10,
            }}
        >
            {true
                ? (
                    <View
                        style={{
                            display: 'flex',
                            flexDirection: 'row',
                            justifyContent: 'flex-start',
                        }}
                    >
                        {renderImage()}
                        {renderControls()}
                    </View>
                )
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