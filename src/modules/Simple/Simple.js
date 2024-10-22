import React, { useState } from 'react'
import {
    Button,
    StyleSheet,
    Text,
    TextInput,
    View,
} from 'react-native'

export default Simple = () => {

    // create string var to store textinput value in state
    const [textValue, setTextValue] = useState('')

    // create array to store saved values in state
    const [savedValues, setSavedValues] = useState([])

    // method to handle button press
    const handlePress = () => {
        console.log('button pressed', textValue)
        
        // add textinput value to saveValues array
        // 
        // note:
        // this is where we would call an asynchronous request 
        // to save the value to our database, which will return
        // confirmation, at which point we can add the item to 
        // the array of saved values. This way we don't have to 
        // repeatedly fetch all saved items every time we save a
        // new value (but that is also an option).
        // 
        // for now we'll just save it to the stat array...
        setSavedValues([textValue, ...savedValues])

        // clear text values
        setTextValue('')
    }

    // loop through saved values and return list item as jsx element
    const renderSavedValues = () => (
        <View
            style={styles.valueList}
        >
            {savedValues.map((value, index) => (
                <Text
                    key={`saved-value-${index}`}
                    style={styles.valueListItem}
                >
                    {value}
                </Text>
            ))}
        </View>
    )

    return (
        <View
            style={styles.container}
        >
            {/* header */}
            <Text
                style={styles.header}
            >
                RN TextInput Example
            </Text>

            {/* input field */}
            <TextInput
                value={textValue}
                onChangeText={setTextValue}
                placeholder='write something...'
                placeholderTextColor='#aaa'
                style={styles.textInput}
            />

            {/* text value preview */}
            <Text
                style={styles.textPreview}
            >
                {textValue}
            </Text>

            {/* button to init save */}
            <Button
                title='Press Me'
                color='#f00'
                onPress={handlePress}
            />

            {/* render saved values in value list */}
            {savedValues.length > 0 && renderSavedValues()}

        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        padding: 10,
        backgroundColor: '#ccc',
    },
    header: {
        paddingBottom: 10,
        fontSize: 20,
        fonrWeight: 700,
        color: '#f00',
    },
    textInput: {
        paddingVertical: 4,
        paddingHorizontal: 10,
        height: 30,
        lineHeight: 22,
        fontSize: 18,
        backgroundColor: '#fff',
    },
    textPreview: {
        paddingVertical: 3,
        minHeight: 26,
        lineHeight: 20,
        fontSize: 16,
    },
    button: {
        marginBottom: 10,
    },
    valueList: {
        marginTop: 7,
    },
    valueListItem: {
        paddingVertical: 3,
        minHeight: 26,
        lineHeight: 20,
        fontSize: 16,
    },
})