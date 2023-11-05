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
    ImageLoader,
    // ImagePreview,
    ImageUploader,
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
    const [ title, setTitle ] = useState(existingProduct ? existingProduct.title : '')
    const [ price, setPrice ] = useState(existingProduct ? existingProduct.price : '')
    const [ blurb, setBlurb ] = useState(existingProduct ? existingProduct.blurb : '')
    const [ desc, setDesc ] = useState(existingProduct ? existingProduct.desc : '')
    const [ category, setCategory ] = useState(existingProduct ? existingProduct.category : 'main')
    // const [ image, setImage ] = useState(null)
    const [ imageId, setImageId ] = useState(existingProduct ? existingProduct.imageId : null)
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
            console.log('form initiated with existing product:', existingProduct)
        }

    }, [])

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
            imageId,
        }

        if (existingProduct && existingProduct._id) {
            productData = {
                ...productData,
                _id: existingProduct._id,
            }
        }

        if (attachment) productData = {
            ...productData,
            attachment,
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
        
        if (data.imageId)
            dispatch({ type: 'ADD_IMAGE', image: data.imageId })

        setTitle('')
        setPrice('')
        setDesc('')
        setBlurb('')
        setCategory('')
        // setFilename(null)
        setImageId(null)
        setAttachment(null)

        onComplete(data)
    }

    // const onImageUploaded = name => {
    //     console.log('filename set after image upload', name)
    //     setFilename(name)
    // }
    
    const onImageSelected = payload => {
        console.log('image selected', payload.imageData.filename)
        setImageId(null)
        // setFilename(null)
        setUpload(payload)
        setShowSelector(false)
        // const { uri, height, width } = data.imageData
    }

    const renderCurrentImage = () => {
        const styles = {
            width: 50,
            height: 50,
            resizeMode: 'stretch',
        }
        return (
            <View>
                <View>
                    {imageId ? (
                        <ImageLoader
                            imageData={imageId}
                        />
                    ) : attachment ? (
                        <Image
                            style={styles}
                            source={{ uri: attachment.thumbData.uri }}
                        />
                    ) : null}
                </View>
                <Pressable onPress={() => setShowSelector(true)}>
                    <Text>Upload New Image</Text>
                </Pressable>
            </View>
        )
    }

    const renderImageModule = () => (
        <View>
            {!showSelector
                ? renderCurrentImage()
                : (
                    <ImageUploader
                        onImageSelected={onImageSelected}
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