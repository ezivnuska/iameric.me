import React, { useEffect, useState } from 'react'
import {
    Button,
    FlatList,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from 'react-native'

const TextInputForm = () => {

    // we will set this as a reference to the textfield below
    let textfield

    const [inputValue, setInputValue] = useState('')
    const [entries, setEntries] = useState([])

    // useEffect is a react hook that is called whenever
    // the variable(s) in the ending array have changed.
    // if the ending array is empty, the function will be 
    // called when the component mounts.

    useEffect(() => {
        console.log('entries changed...', entries)
    }, [entries])

    const submitForm = () => {
        console.log(inputValue)
        if (!inputValue.length) return alert('Field cannot be blank.')

        setEntries([...entries, inputValue])
        setInputValue('')

        textfield.focus()

        // example of axios request

        // axios.post('/api/data', { value: inputValue }, (req, res) => {
        //     console.log(res.data)
        // })
    }

    const deleteEntryAtIndex = index => {
        const updatedArray = entries.filter((entry, i) => index != i)
        setEntries(updatedArray)
    }

    return (
        <View style={styles.container}>

            <View style={styles.formContainer}>

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
                    onPress={() => submitForm()}
                    style={styles.button}
                />

            </View>

            {entries.length ? (
                <FlatList
                    data={entries}
                    keyExtractor={(item, index) => 'entry' + index}
                    renderItem={({ item, index }) => (
                        <TouchableOpacity
                            onPress={() => deleteEntryAtIndex(index)}
                        >
                            <Text style={styles.entry}>{item}</Text>
                        </TouchableOpacity>
                    )}
                />
            ) : <Text>No entries yet.</Text>}

        </View>
    )
}

export default TextInputForm

const styles = StyleSheet.create({
    container: {

    },
    formContainer: {
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
    button: {
        borderRadius: 10,
    },
    entry: {
        fontWeight: 700,
        color: 'red',
    },
})