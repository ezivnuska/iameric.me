import React, { useContext, useState } from 'react'
import {
    View,
} from 'react-native'
import {
    FormInput,
    IconButton,
} from '.'
import { AppContext } from '../AppContext'
import classes from '../styles/classes'
import axios from 'axios'

const initialState = {
    address1: '',
    address2: '',
    city: '',
    state: '',
    zip: '',
}

export default () => {

    const {
        dispatch,
        loading,
        location,
        user,
    } = useContext(AppContext)
    
    const [ address1, setAddress1 ] = useState(location?.address1 || initialState.address1)
    const [ address2, setAddress2 ] = useState(location?.address2 || initialState.address2)
    const [ city, setCity ] = useState(location?.city || initialState.city)
    const [ state, setState ] = useState(location?.state || initialState.state)
    const [ zip, setZip ] = useState(location?.zip || initialState.zip)
    const [ dirty, setDirty ] = useState(false)

    const onChange = (name, value) => {
        switch(name) {
            case 'address1': {
                setDirty(value !== location.address1)
                setAddress1(value)
            }
            break
            case 'address2': {
                setDirty(value !== location.address2)
                setAddress2(value)
            }
            break
            case 'city': {
                setDirty(value !== location.city)
                setCity(value)
            }
            break
            case 'state': {
                setDirty(value !== location.state)
                setState(value)
            }
            break
            case 'zip': {
                setDirty(value !== location.zip)
                setZip(value)
            }
            break
        }
    }

    const onSubmitAddress = async newLocation => {
        
        dispatch({ type: 'SET_LOADING', loading: 'Updating address...' })

        const { data } = await axios
            .post('/api/location', newLocation)
        
        dispatch({ type: 'SET_LOADING', loading: null })
        
        if (!data) {
            console.log('Error saving location', err)
            return
        }
        
        dispatch({ type: 'SET_LOCATION', location: data.location })
    }

    const submitForm = () => {
        if (!isValid()) return
        const { _id, username } = user
        const newLocation = { userId: _id, username, address1, address2, city, state, zip }
        onSubmitAddress(newLocation)
    }

    const isValid = () => {
        return (
            dirty &&
            address1.length &&
            city.length &&
            state.length &&
            zip.length
        )
    }

	const onEnter = e => {
		if (e.code === 'Enter') submitForm()
	}

    return (
        <View style={classes.formContainer}>
            
            <FormInput
                label='Address'
                value={address1}
                onChangeText={value => onChange('address1', value)}
                placeholder='address1'
                textContentType='streetAddressLine1'
                autoCapitalize='words'
                keyboardType='default'
                onKeyPress={onEnter}
            />
            
            <FormInput
                value={address2}
                onChangeText={value => onChange('address2', value)}
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
                    onChangeText={value => onChange('city', value)}
                    placeholder='city'
                    textContentType='addressCity'
                    autoCapitalize='words'
                    keyboardType='default'
					onKeyPress={onEnter}
                />
                
                <FormInput
                    label='State'
                    value={state}
                    onChangeText={value => onChange('state', value)}
                    placeholder='state'
                    textContentType='addressState'
                    autoCapitalize='none'
                    keyboardType='default'
                    style={[classes.formInput, { width: 100 }]}
					onKeyPress={onEnter}
                />
            </View>
            
            <FormInput
                label='Zip'
                value={zip}
                onChangeText={value => onChange('zip', value)}
                placeholder='zip'
                textContentType='postalCode'
                autoCapitalize='none'
                keyboardType='default'
                onKeyPress={onEnter}
            />

            <IconButton
                type='primary'
                label='Update Location'
                onPress={submitForm}
                disabled={loading || !isValid()}
            />

        </View>
    )
}