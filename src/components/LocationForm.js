import React, { useContext, useState } from 'react'
import {
    // StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View
} from 'react-native'
import axios from 'axios'
import { AppContext } from '../AppContext'
import defaultStyles from '../styles'
import {
    ButtonPrimary,
    FormInput,
} from '.'

const LocationForm = ({ addLocation, updateStatus }) => {

    const {
        state,
        dispatch,
    } = useContext(AppContext)

    const { user } = state
    const [ title, setTitle ] = useState('')
    const [ address, setAddress ] = useState('')
    const [ city, setCity ] = useState('')
    const [ type, setType ] = useState('')

    const onChangeTitle = value => setTitle(value)
    const onChangeAddress = value => setAddress(value)
    const onChangeCity = value => setCity(value)
    const onChangeType = value => setType(value)

    const onSubmit = () => {
        const { _id, role, username } = user
        const newLocation = { title, address, city, type }
        addLocation(newLocation)
        if (updateStatus) updateStatus('Sending...')
        axios
            .post('/api/location', newLocation)
            .then(({ data }) => {
                updateStatus('Sent!')
                // dispatch({ type: 'NEW_ENTRY', entry: data.entry })
                // setEntry('')
                console.log('Location added.', data.location)
            })
            .catch(err => {
                updateStatus('Error saving location.')
                console.log('Error saving location', err)
            })
    }

    const isValid = () => {
        return (
            title.length &&
            address.length &&
            city.length &&
            type.length
        )
    }

    return (
        <View style={defaultStyles.form}>
            
            <FormInput
                label='Title'
                value={title}
                onChangeText={onChangeTitle}
                placeholder='title'
                textContentType='none'
                autoCapitalize='words'
                keyboardType='default'
                style={defaultStyles.input}
            />
            
            <FormInput
                label='Address'
                value={address}
                onChangeText={onChangeAddress}
                placeholder='address'
                textContentType='none'
                autoCapitalize='words'
                keyboardType='default'
                style={defaultStyles.input}
            />
            
            <FormInput
                label='CIty'
                value={city}
                onChangeText={onChangeCity}
                placeholder='city'
                textContentType='none'
                autoCapitalize='words'
                keyboardType='default'
                style={defaultStyles.input}
            />
            
            <FormInput
                label='Type'
                value={type}
                onChangeText={onChangeType}
                placeholder='type'
                textContentType='none'
                autoCapitalize='words'
                keyboardType='default'
                style={defaultStyles.input}
            />

            <ButtonPrimary
                label='Add Location'
                disabled={!isValid()}
                onPress={onSubmit}
            />

        </View>
    )
}

export default LocationForm

// const styles = StyleSheet.create({

// })