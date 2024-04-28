import React, { useEffect, useMemo, useState } from 'react'
import {
    View,
} from 'react-native'
import {
    FormField,
    IconButton,
} from '.'
import {
    useApp,
    useForm,
    useModal,
    useUser,
} from '@context'
import { getFields } from '@utils/form'
import axios from 'axios'

export default () => {

    const { landscape } = useApp()
    
    const initialState = {
        address1: '',
        address2: '',
        city: '',
        state: '',
        zip: '',
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

    const { profile, setUserLocation } = useUser()
    const { closeModal, data } = useModal()

    const [initialValues, setInitialValues] = useState(null)

    const {
        address1,
        address2,
        city,
        state,
        zip,
    } = useMemo(() => formFields, [formFields])

    useEffect(() => {
        const fields = getFields(initialState, data)
        setInitialValues(fields)
    }, [])
    
    useEffect(() => {
        if (initialValues) initForm(initialValues)
    }, [initialValues])

    useEffect(() => {
        if (formReady) validateFields()
    }, [address1, address2, city, state, zip])

    const validateFields = () => {
        const keys = Object.keys(formFields)
        let index = 0
        while (index < keys.length) {
            const key = keys[index]
            const isValid = validateField(key)
            if (!isValid) return
            else index++
        }
    }

    const validateField = name => {
        let isValid = true
        switch (name) {
            case 'address1':
                if (!address1.length) {
                    setFormError({ name, message: 'Address1 invalid.'})
                    isValid = false
                }
                break
            case 'address2':
                if (!address2.length) {
                    setFormError({ name, message: 'Address2 required.'})
                    isValid = false
                }
                break
            case 'city':
                if (!city.length) {
                    setFormError({ name, message: 'City invalid.'})
                    isValid = false
                }
                break
            case 'state':
                if (state.length < 2) {
                    setFormError({ name, message: 'State required.'})
                    isValid = false
                }
                break
            case 'zip':
                if (!zip.length) {
                    setFormError({ name, message: 'Zip required.'})
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

    const submitFormData = async () => {
        
        if (formError) {
			console.log(`Error in form field ${formError.name}: ${formError.message}`)
            return
		}

        const { _id, username } = profile

        const newLocation = {
            userId: _id,
            username,
            address1,
            address2,
            city,
            state,
            zip,
        }
        
        setFormLoading(true)
        
        const response = await axios
            .post('/api/location', newLocation)
        
        setFormLoading(false)

        if (!response.data) {
            console.log('Error saving location', err)
        } else {
            setUserLocation(response.data.location)
            clearForm()
            closeModal()
        }
    }

    const renderFields = () => (
        <>
            <FormField
                label='Address'
                value={address1}
                error={getError('address1')}
                placeholder='street address'
                textContentType='streetAddressLine1'
                keyboardType='default'
                autoCapitalize='words'
                onChangeText={value => onChange('address1', value)}
                autoFocus={getFocus('address1')}
                onKeyPress={onEnter}
                dirty={getDirty('address1')}
            />
            <FormField
                value={address2}
                error={getError('address2')}
                placeholder='ste/apt'
                textContentType='streetAddressLine2'
                keyboardType='default'
                autoCapitalize='words'
                onChangeText={value => onChange('address2', value)}
                autoFocus={getFocus('address2')}
                onKeyPress={onEnter}
                dirty={getDirty('address2')}
            />
            <View
                style={{
                    display: 'flex',
                    flexDirection: landscape ? 'row' : 'column',
                    justifyContent: landscape ? 'space-between' : 'flex-start',
                    gap: landscape ? 10 : 0,
                }}
            >
                <FormField
                    label='City'
                    value={city}
                    error={getError('city')}
                    placeholder='city'
                    textContentType='addressCity'
                    keyboardType='default'
                    autoCapitalize='words'
                    onChangeText={value => onChange('city', value)}
                    autoFocus={getFocus('city')}
                    onKeyPress={onEnter}
                    dirty={getDirty('city')}
                />

                <FormField
                    label='State'
                    value={state}
                    error={getError('state')}
                    placeholder='state'
                    textContentType='addressState'
                    keyboardType='default'
                    autoCapitalize='words'
                    onChangeText={value => onChange('state', value)}
                    autoFocus={getFocus('state')}
                    onKeyPress={onEnter}
                    dirty={getDirty('state')}
                />
            </View>

            <FormField
                label='Zip'
                value={zip}
                error={getError('zip')}
                placeholder='zip'
                textContentType='postalCode'
                keyboardType='default'
                autoCapitalize='words'
                onChangeText={value => onChange('zip', value)}
                autoFocus={getFocus('zip')}
                onKeyPress={onEnter}
                dirty={getDirty('zip')}
            />
        </>
    )
    return focused !== null ? (
        <View
            style={{ paddingVertical: 20 }}
        >
            <View style={{ marginBottom: 10 }}>
                {renderFields()}
            </View>

            <IconButton
                type='primary'
                label={formLoading ? 'Updating' : 'Update'}
                disabled={formLoading || formError}
                onPress={submitFormData}
            />

        </View>
    ) : null
}