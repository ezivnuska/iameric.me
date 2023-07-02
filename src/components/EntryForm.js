import React, { useEffect, useRef, useState } from 'react'
import {
    Button,
    StyleSheet,
    Text,
    TextInput,
    View,
} from 'react-native'

const EntryForm = ({ onSubmit }) => {

    // setting this to use as a reference to textfield
    let input = useRef()

    const [inputValue, setInputValue] = useState('')

    const submitForm = () => {

        if (!inputValue.length) return alert('Field cannot be blank.')
        
        onSubmit(inputValue)
        setInputValue('')

        // example of axios request
        // axios.post('/api/data', { value: inputValue }, (req, res) => {
        //     console.log(res.data)
        // })
    }

    return (
        <View style={styles.container}>

            <Text style={styles.header}>Entry Form</Text>

            <Text style={styles.display}>{inputValue}</Text>

            <TextInput
                style={styles.input}
                ref={input}
                onChangeText={value => setInputValue(value)}
                placeholder='write something...'
                placeholderTextColor='#ccc'
                value={inputValue}
                autoFocus
                onBlur={() => input.current.focus()}
                onKeyPress={({ nativeEvent }) => {
                    if (nativeEvent.key === 'Enter') submitForm()
                }}
            />

            <Button
                title='Submit'
                onPress={submitForm}
            />

        </View>
    )
}

export default EntryForm

const styles = StyleSheet.create({
    container: {
        padding: 20,
        borderWidth: 1,
        borderRadius: 6,
        marginBottom: 20,
    },
    header: {
        marginBottom: 10,
        fontSize: 24,
        fontWeight: 700,
        lineHeight: 24,
        color: 'black',
        height: 24,
    },
    display: {
        marginBottom: 10,
        fontSize: 20,
        fontWeight: 700,
        lineHeight: 20,
        color: 'green',
        height: 20,
    },
    input: {
        borderWidth: 1,
        marginBottom: 10,
        padding: 10,
        lineHeight: 24,
        fontSize: 20,
    },
})