import React, { useEffect, useMemo, useState } from 'react'
import { View } from 'react-native'
import {
    FormField,
    IconButton,
} from '@components'
import {
    useForm,
    useModal,
    useApp,
} from '@context'
import { getFields } from '@utils/form'
import { addUserLocation } from '@utils/user'
import { classes } from '@styles'

export default ({ location }) => {
    
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

    const { closeModal } = useModal()
    const { profile, setUserLocation } = useApp()

    const [initialValues, setInitialValues] = useState(null)

    const {
        address1,
        address2,
        city,
        state,
        zip,
    } = useMemo(() => formFields, [formFields])

    useEffect(() => {
        const fields = getFields(initialState, location || null)
        setInitialValues(fields)
    }, [])
    
    useEffect(() => {
        if (initialValues) initForm(initialValues)
    }, [initialValues])

    useEffect(() => {
        if (formReady) validateFields()
    }, [address1, city, state, zip])

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
            // case 'address2':
            //     if (!address2.length) {
            //         setFormError({ name, message: 'Address2 required.'})
            //         isValid = false
            //     }
            //     break
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
                // console.log('No field to validate')
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
			return console.log(`Error in form field ${formError.name}: ${formError.message}`)
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
        const addedLocation = await addUserLocation(newLocation)
        setFormLoading(false)

        if (!addedLocation) {
            console.log('Error saving location')
        } else {
            setUserLocation(addedLocation)
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
                required
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
                    flexDirection: 'column',
                    justifyContent: 'flex-start',
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
                    required
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
                    required
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
                required
            />
        </>
    )
    return focused !== null ? (
        <View style={classes.centerV}>
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
        </View>
    ) : null
}