import React, { useEffect, useState } from 'react'
import {
    View,
} from 'react-native'
import {
    FormInput,
    IconButton,
} from '.'
import {
    useModal,
    useUser,
} from '@context'
import classes from '../styles/classes'
import axios from 'axios'

export default ({ location }) => {

    const { profile, setLocation, setUserLoading, userLoading } = useUser()
    const { closeModal } = useModal()
    
    const [ initialState, setInitialState ] = useState(location || {
        address1: '',
        address2: '',
        city: '',
        state: '',
        zip: '',
    })
    const [ address1, setAddress1 ] = useState(location.address1)
    const [ address2, setAddress2 ] = useState(location.address2)
    const [ city, setCity ] = useState(location.city)
    const [ state, setState ] = useState(location.state)
    const [ zip, setZip ] = useState(location.zip)
    const [ dirty, setDirty ] = useState(false)

    useEffect(() => {
        if (location) {
            setInitialState(location)
        }
    }, [])

    useEffect(() => {
        setAddress1(location.address1)
        setAddress2(location.address2)
        setCity(location.city)
        setState(location.state)
        setZip(location.zip)
    }, [location])

    const onChange = (name, value) => {
        switch(name) {
            case 'address1': {
                setDirty(value !== initialState.address1)
                setAddress1(value)
            }
            break
            case 'address2': {
                setDirty(value !== initialState.address2)
                setAddress2(value)
            }
            break
            case 'city': {
                setDirty(value !== initialState.city)
                setCity(value)
            }
            break
            case 'state': {
                setDirty(value !== initialState.state)
                setState(value)
            }
            break
            case 'zip': {
                setDirty(value !== initialState.zip)
                setZip(value)
            }
            break
        }
    }

    const submitForm = async () => {
        
        if (!isValid()) return

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
        
        setUserLoading(true)
        
        const { data } = await axios
            .post('/api/location', newLocation)
        
        setUserLoading(false)

        if (!data) {
            console.log('Error saving location', err)
        } else {
            setLoaction(data.location)
            closeModal()
        }
    }

    const isValid = () => {
        let valid = true
        if (!dirty) valid = false
        if (!address1.length) valid = false
        if (!city.length) valid = false
        if (!state.length) valid = false
        if (!zip.length) valid = false
        return valid
    }

	const onEnter = e => {
		if (e.code === 'Enter') {
            submitForm()
        }
	}

    return (
        <View style={classes.formContainer}>
            
            <FormInput
                label='Address'
                value={address1}
                onChange={value => onChange('address1', value)}
                placeholder='address1'
                textContentType='streetAddressLine1'
                autoCapitalize='words'
                keyboardType='default'
                onKeyPress={onEnter}
                invalid={address1.length < 1}
            />
            
            <FormInput
                value={address2}
                onChange={value => onChange('address2', value)}
                placeholder='Ste/Apt'
                textContentType='streetAddressLine2'
                autoCapitalize='words'
                keyboardType='default'
                onKeyPress={onEnter}
            />
            
            <View
                style={classes.formColumns}
            >
                <FormInput
                    label='City'
                    value={city}
                    onChange={value => onChange('city', value)}
                    placeholder='city'
                    textContentType='addressCity'
                    autoCapitalize='words'
                    keyboardType='default'
					onKeyPress={onEnter}
                    invalid={city.length < 1}
                />
                
                <FormInput
                    label='State'
                    value={state}
                    onChange={value => onChange('state', value)}
                    placeholder='state'
                    textContentType='addressState'
                    autoCapitalize='none'
                    keyboardType='default'
                    style={{ flexBasis: 100 }}
					onKeyPress={onEnter}
                    invalid={state.length !== 2}
                />
            </View>
            
            <FormInput
                label='Zip'
                value={zip}
                onChange={value => onChange('zip', value)}
                placeholder='zip'
                textContentType='postalCode'
                autoCapitalize='none'
                keyboardType='default'
                onKeyPress={onEnter}
                invalid={zip.length < 1}
            />

            <IconButton
                type='primary'
                label='Update Location'
                onPress={submitForm}
                disabled={userLoading || !isValid()}
                style={{ marginTop: 10 }}
            />

        </View>
    )
}