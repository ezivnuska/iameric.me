import React, { useContext, useEffect, useState } from 'react'
import {
    View,
} from 'react-native'
import { AppContext } from '../AppContext'
import defaultStyles from '../styles/main'
import {
    ButtonPrimary,
    FormInput,
} from '.'

const LocationForm = ({ onSubmit, location }) => {

    const context = useContext(AppContext)

    const { user } = context.state
    
    const [ address1, setAddress1 ] = useState(location.address1)
    const [ address2, setAddress2 ] = useState(location.address2)
    const [ city, setCity ] = useState(location.city)
    const [ state, setState ] = useState(location.state)
    const [ zip, setZip ] = useState(location.zip)

    const onChangeAddressLine1 = value => setAddress1(value)
    const onChangeAddressLine2 = value => setAddress2(value)
    const onChangeCity = value => setCity(value)
    const onChangeState = value => setState(value)
    const onChangeZip = value => setZip(value)

    const setLocation = () => {
        setAddress1(location.address1)
        setAddress2(location.address2)
        setCity(location.city)
        setState(location.state)
        setZip(location.zip)
    }
    
    // useEffect(() => {
    //     setLocation()
    // }, [])

    // useEffect(() => {
    //     setLocation()
    // }, [location])

    const submitForm = () => {
        const { _id, username } = user
        const newLocation = { userId: _id, username, address1, address2, city, state, zip }
        onSubmit(newLocation)
    }

    const isValid = () => {
        return (
            address1.length &&
            city.length &&
            state.length &&
            zip.length
        )
    }

    return (
        <View style={defaultStyles.form}>
            
            <FormInput
                label='Address'
                value={address1}
                onChangeText={onChangeAddressLine1}
                placeholder='address1'
                textContentType='streetAddressLine1'
                autoCapitalize='words'
                keyboardType='default'
                style={defaultStyles.input}
            />
            
            <FormInput
                label=''
                value={address2}
                onChangeText={onChangeAddressLine2}
                placeholder='address2'
                textContentType='streetAddressLine2'
                autoCapitalize='words'
                keyboardType='default'
                style={defaultStyles.input}
            />
            
            <FormInput
                label='City'
                value={city}
                onChangeText={onChangeCity}
                placeholder='city'
                textContentType='addressCity'
                autoCapitalize='words'
                keyboardType='default'
                style={defaultStyles.input}
            />
            
            <FormInput
                label='State'
                value={state}
                onChangeText={onChangeState}
                placeholder='state'
                textContentType='addressState'
                autoCapitalize='none'
                keyboardType='default'
                style={defaultStyles.input}
            />
            
            <FormInput
                label='Zip'
                value={zip}
                onChangeText={onChangeZip}
                placeholder='zip'
                textContentType='postalCode'
                autoCapitalize='none'
                keyboardType='default'
                style={defaultStyles.input}
            />

            <ButtonPrimary
                label='Add Location'
                disabled={!isValid()}
                onPress={submitForm}
            />

        </View>
    )
}

export default LocationForm