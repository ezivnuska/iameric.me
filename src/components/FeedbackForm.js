import React, { useContext, useState } from 'react'
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import axios from 'axios'
import { AppContext } from '../AppContext'
import defaultStyles from '../styles'
const API_PATH = process.env.API_PATH || '/api'

const FeedbackForm = () => {

    const { state, dispatch } = useContext(AppContext)
    const { user } = state
    const [ entry, setEntry ] = useState('')

    const onChangeEntry = value => setEntry(value)

    const onSubmit = () => {
        const { username, _id } = user
        const newEntry = { username, userId: _id, text: entry }
        axios
            .post(`${API_PATH}/entry`, newEntry)
            .then(({ data }) => {
                dispatch({ type: 'NEW_ENTRY', entry: data.entry })
                setEntry('')
            })
            .catch(err => console.log('Error saving entry', err))
    }

    return (
        <View style={defaultStyles.form}>

            <Text style={defaultStyles.title}>Give Feedback</Text>
            
            <TextInput
                style={defaultStyles.input}
                onChangeText={onChangeEntry}
                value={entry}
                placeholder='say something...'
                textContentType='none'
                autoCapitalize='sentences'
                keyboardType='default'
            />
            <TouchableOpacity
                style={defaultStyles.button}
                onPress={onSubmit}
            >
                <Text
                    style={defaultStyles.buttonLabel}
                >
                    Say it
                </Text>
            </TouchableOpacity>
        </View>
    )
}

export default FeedbackForm

const styles = StyleSheet.create({
})