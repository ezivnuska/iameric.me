import React, { useState } from 'react'
import {
    Button,
    StyleSheet,
    Text,
    TextInput,
    View,
} from 'react-native'

const TextInputForm = ({ onSubmit }) => {

    // we will set this as a reference to the textfield below
    let textfield

    const [inputValue, setInputValue] = useState('')

    const submitForm = () => {

        if (!inputValue.length) return alert('Field cannot be blank.')
        
        onSubmit(inputValue)
        
        setInputValue('')
        textfield.focus()

        // example of axios request

        // axios.post('/api/data', { value: inputValue }, (req, res) => {
        //     console.log(res.data)
        // })
    }

    return (
        <View style={styles.container}>

            <Text style={styles.header}>Simple Form</Text>

            <Text style={styles.display}>{inputValue}</Text>

            <TextInput
                style={styles.input}
                ref={ref => textfield = ref}
                onChangeText={value => setInputValue(value)}
                placeholder='write something...'
                placeholderTextColor='#ccc'
                value={inputValue}
            />

            <Button
                title='Submit'
                onPress={submitForm}
            />

        </View>
    )
}

export default TextInputForm

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