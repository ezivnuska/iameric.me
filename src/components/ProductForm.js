import React, { useEffect, useMemo, useState } from 'react'
import {
    View,
} from 'react-native'
import {
    CategoryPicker,
    FormField,
    IconButton,
    ImageFormModule,
} from '.'
import axios from 'axios'
import {
    useForm,
    useModal,
    useProducts,
    useUser,
} from '@context'
import { getFields, validateFields } from '@utils/form'

const IMAGE_PATH = __DEV__ ? 'https://iameric.me/assets' : '/assets'

export default  ({ product }) => {

    const initialState = {
        title: '',
        price: '',
        blurb: '',
        desc: '',
        category: 'main',
        image: null,
        attachment: null,
    }

    const {
        clearForm,
        clearFormError,
        focused,
        formError,
        formFields,
        formLoading,
        formReady,
        getDirty,
        getError,
        getFocus,
        initForm,
        markDirty,
        setFocus,
        setFormError,
        setFormLoading,
        setFormValues,
    } = useForm()
    
    const {
        addProduct,
        updateProduct,
    } = useProducts()

    const { closeProductModal } = useProducts()
    const { profile } = useUser()

    const [initialValues, setInitialValues] = useState(null)

    const {
        title,
        price,
        blurb,
        desc,
        category,
        image,
        attachment,
    } = useMemo(() => formFields, [formFields])
    
    useEffect(() => {
        const fields = getFields(initialState, product)
        setInitialValues(fields)
    }, [])
    
    useEffect(() => {
        if (initialValues) initForm(initialValues)
    }, [initialValues])

    useEffect(() => {
        if (formReady) validateFields(formFields, validate)
    }, [title, price, blurb, desc, category, image, attachment])

    const validate = name => {
        let isValid = true
        switch (name) {
            case 'title':
                if (!title.length) {
                    setFormError({ name, message: 'Title required.'})
                    isValid = false
                }
                break
            case 'price':
                if (!price.length) {
                    setFormError({ name, message: 'Price required.'})
                    isValid = false
                }
                break
            case 'blurb':
                if (!blurb.length) {
                    setFormError({ name, message: 'Blurb required.'})
                    isValid = false
                }
                break
            case 'desc':
                if (!desc.length) {
                    setFormError({ name, message: 'Description required.'})
                    isValid = false
                }
                break
            default:
                console.log('No field to validate')
        }

        if (isValid && getError(name)) {
            clearFormError()
            setFocus(0)
        } else {
            setFocus(name)
        }

        return isValid
    }

    const onChange = (key, value) => {
        if (!getDirty(key)) markDirty(key)
        setFormValues({ ...formFields, [key]: value })
    }
    
    const onEnter = e => {
		if (e.code === 'Enter') submitFormData()
	}

    const resetForm = () => {
        if (product) {
            setFormValues(product)
        } else {
            clearForm()
        }
    }

    const submitFormData = async () => {
        if (formError) {
			console.log(`Error in form field ${formError.name}: ${formError.message}`)
            return
		}

        const { _id } = profile
        
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
        
        setFormLoading(true)
        const response = await axios.post('/api/product', newProduct)
        setFormLoading(false)
            
        if (!response || !response.data) {
            console.log('Error saving product', product)
        } else {

            if (product) updateProduct(response.data)
            else addProduct(response.data)
            
            clearForm()
            closeProductModal()
        }
    }

    const removeImage = () => {
        if (attachment || image) {
            setFormValues({
                ...formFields,
                attachment: null,
                image: null,
            })
        }
    }

    const renderImageFormModule = () => {
        
        const source = image
            ? `${IMAGE_PATH}/${profile.username}/thumb/${image.filename}`
            : attachment
                ? { uri: attachment.thumbData.uri }
                : null

        return (
            <ImageFormModule
                onImageSelected={att => {
                    setFormValues({ attachment: att })
                }}
                removeImage={removeImage}
                source={source}
            />
        )
    }

    const renderFields = () => (
        <>
            <CategoryPicker
                style={{ marginBottom: 10 }}
                label='Category'
                onChange={value => onChange('category', value)}
                category={category}
                disabled={formLoading}
            />

            {renderImageFormModule()}

            <FormField
                label='Title'
                value={title}
                error={getError('title')}
                placeholder='title'
                textContentType='default'
                keyboardType='default'
                autoCapitalize='true'
                onChangeText={value => onChange('title', value)}
                autoFocus={getFocus('title')}
                onKeyPress={onEnter}
                dirty={getDirty('title')}
            />

            <FormField
                label='Price'
                value={price}
                error={getError('price')}
                placeholder='0.00'
                textContentType='default'
                keyboardType='default'
                onChangeText={value => onChange('price', value)}
                autoFocus={getFocus('price')}
                onKeyPress={onEnter}
                dirty={getDirty('price')}
            />
            <FormField
                label='Blurb'
                value={blurb}
                error={getError('blurb')}
                placeholder='blurb'
                keyboardType='default'
                textContentType='default'
                autoCapitalize='true'
                onChangeText={value => onChange('blurb', value)}  
                autoFocus={getFocus('blurb')}
                onKeyPress={onEnter}
                dirty={getDirty('blurb')}
                multiline
            />
            <FormField
                label='Description'
                value={desc}
                error={getError('desc')}
                placeholder='description'
                keyboardType='default'
                textContentType='default'
                autoCapitalize='true'
                onChangeText={value => onChange('desc', value)}  
                autoFocus={getFocus('desc')}
                onKeyPress={onEnter}
                dirty={getDirty('desc')}
                multiline
            />
        </>
    )

    return focused !== null ? (
        <View
            style={{ paddingVertical: 20 }}
        >
            <View style={{  marginBottom: 10 }}>
                {renderFields()}
            </View>

            <IconButton
                type='primary'
                label='Save'
                onPress={submitFormData}
                disabled={
                    formLoading
                    || getError('title')
                    || getError('price')
                }
                style={{ marginVertical: 5 }}
            />

            <IconButton
                label={product ? 'Reset Form' : 'Clear Form'}
                onPress={resetForm}
                disabled={formLoading}
                style={{ marginVertical: 5 }}
            />

        </View>
    ) : null
}