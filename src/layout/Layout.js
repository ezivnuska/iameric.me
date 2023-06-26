import React, { useState } from 'react'
import {
    Button,
    StyleSheet,
    Text,
    TextInput,
    View,
} from 'react-native'

const Layout = () => {

    const [inputValue, setInputValue] = useState('')

    const submitForm = () => {
        console.log(inputValue)

        // example of axios request

        // axios.post('/api/data', (req, res) => {
        //     console.log(res.data)
        // })
    }

    return (
        <View style={styles.container}>
        
            <View style={styles.formContainer}>

                <Text style={styles.header}>Simple Form</Text>

                <Text style={styles.display}>{inputValue}</Text>
                
                <TextInput
                    style={styles.input}
                    onChangeText={value => setInputValue(value)}
                    placeholder='write something...'
                    placeholderTextColor='#ccc'
                />

                <Button
                    title='Submit'
                    onPress={() => submitForm()}
                />

            </View>

        </View>
    )
}

export default Layout

const styles = StyleSheet.create({
    container: {
        height: '100%',
        minHeight: '100%',
        padding: 20,
    },
    formContainer: {
        padding: 20,
        borderWidth: 1,
        borderRadius: 6,
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
    button: {

    },
})