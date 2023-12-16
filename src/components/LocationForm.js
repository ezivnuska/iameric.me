import React, { useContext, useEffect, useState } from 'react'
import {
    Text,
    View,
} from 'react-native'
import { AppContext } from '../AppContext'
import defaultStyles from '../styles/main'
import {
    FormButton,
    FormInput,
} from '.'
import { Button } from 'antd'

export default ({ onSubmit, location }) => {

    const context = useContext(AppContext)

    const { user } = context.state
    
    const [ address1, setAddress1 ] = useState(location.address1)
    const [ address2, setAddress2 ] = useState(location.address2)
    const [ city, setCity ] = useState(location.city)
    const [ state, setState ] = useState(location.state)
    const [ zip, setZip ] = useState(location.zip)
    const [ dirty, setDirty ] = useState(false)

    // const onChangeAddressLine1 = value => setAddress1(value)
    // const onChangeAddressLine2 = value => setAddress2(value)
    // const onChangeCity = value => setCity(value)
    // const onChangeState = value => setState(value)
    // const onChangeZip = value => setZip(value)

    const onChange = (name, value) => {
        if (value !== location[name]) setDirty(true)
        else setDirty(false)

        switch(name) {
            case 'address1': setAddress1(value); break
            case 'address2': setAddress2(value); break
            case 'city': setCity(value); break
            case 'state': setState(value); break
            case 'zip': setZip(value); break
        }
    }

    // const setLocation = () => {
    //     setAddress1(location.address1)
    //     setAddress2(location.address2)
    //     setCity(location.city)
    //     setState(location.state)
    //     setZip(location.zip)
    // }
    
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
                onChangeText={value => onChange('address1', value)}
                placeholder='address1'
                textContentType='streetAddressLine1'
                autoCapitalize='words'
                keyboardType='default'
                style={defaultStyles.input}
            />
            
            <FormInput
                value={address2}
                onChangeText={value => onChange('address2', value)}
                placeholder='Ste/Apt'
                textContentType='streetAddressLine2'
                autoCapitalize='words'
                keyboardType='default'
                style={defaultStyles.input}
            />
            
            <View
                style={defaultStyles.formColumns}
            >
                <FormInput
                    label='City'
                    value={city}
                    onChangeText={value => onChange('city', value)}
                    placeholder='city'
                    textContentType='addressCity'
                    autoCapitalize='words'
                    keyboardType='default'
                    style={defaultStyles.input}
                />
                
                <FormInput
                    label='State'
                    value={state}
                    onChangeText={value => onChange('state', value)}
                    placeholder='state'
                    textContentType='addressState'
                    autoCapitalize='none'
                    keyboardType='default'
                    style={[defaultStyles.input, { width: 100 }]}
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
                style={defaultStyles.input}
            />

            <FormButton
                label='Update Location'
                dirty={dirty}
                valid={!dirty || !isValid()}
                onClick={submitForm}
            />

        </View>
    )
}