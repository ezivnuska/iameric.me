import React, { useState } from 'react'
import {
    Pressable,
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
    const renderValueList = () => {
        return (
            <View style={styles.valueListContainer}>
                
                <Text style={styles.header}>
                    Comments {savedValues.length ? `(${savedValues.length})` : ''}
                </Text>

                <View style={styles.valueList}>
                    
                    {savedValues.length ? savedValues.map((value, index) => (
                        <Text
                            key={`saved-value-${index}`}
                            style={styles.valueListItem}
                        >
                            {value}
                        </Text>
                    )) : (
                        <Text style={styles.valueListItem}>No comments yet.</Text>
                    )}

                </View>
                    
                {(savedValues.length > 0) && (
                    <Pressable
                        onPress={() => setSavedValues([])}
                        style={[
                            styles.button,
                            styles.buttonEnabled,
                            { marginBottom: 0 },
                        ]}
                    >
                        <Text style={[styles.buttonLabel, styles.buttonLabelEnabled]}>
                            Clear Comments
                        </Text>
                    </Pressable>
                )}

            </View>
        )
    }

    return (
        <View style={styles.container}>

            {/* header */}
            <Text style={styles.header}>
                Comment List Example
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
            <Text style={styles.textPreview}>
                {textValue}
            </Text>

            {/* button to init save */}
            <Pressable
                onPress={handlePress}
                disabled={!textValue.length}
                style={[
                    styles.button,
                    textValue.length ? styles.buttonEnabled : styles.buttonDisabled,
                ]}
            >
                <Text
                    style={[
                        styles.buttonLabel,
                        textValue.length ? styles.buttonLabelEnabled : styles.buttonLabelDisabled,
                    ]}
                >
                    Save Comment
                </Text>

            </Pressable>

            {/* render saved values in value list */}
            {renderValueList()}

        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        padding: 10,
        backgroundColor: '#ccc',
        borderRadius: 6,
        overflow: 'hidden',
    },
    header: {
        paddingBottom: 10,
        fontSize: 20,
        fontWeight: 700,
        color: '#333',
    },
    textInput: {
        paddingVertical: 4,
        paddingHorizontal: 10,
        marginBottom: 5,
        height: 40,
        lineHeight: 40,
        fontSize: 18,
        backgroundColor: '#fff',
        borderRadius: 6,
        overflow: 'hidden',
    },
    textPreview: {
        paddingHorizontal: 10,
        marginBottom: 5,
        height: 26,
        minHeight: 26,
        lineHeight: 26,
        fontSize: 16,
    },
    button: {
        marginBottom: 10,
        borderRadius: 6,
        overflow: 'hidden',
    },
    buttonEnabled: {
        backgroundColor: '#6c6',
    },
    buttonDisabled: {
        backgroundColor: '#eee',
        textColor: '#ccc',
    },
    buttonLabel: {
        marginHorizontal: 'auto',
        height: 34,
        lineHeight: 34,
        fontSize: 18,
    },
    buttonLabelEnabled: {
        color: '#fff',
    },
    buttonLabelDisabled: {
        color: '#aaa',
    },
    valueListContainer: {
        marginBottom: 7,
    },
    valueList: {
        marginBottom: 7,
    },
    valueListItem: {
        fontSize: 18,
        lineHeight: 20,
        minHeight: 26,
        paddingHorizontal: 10,
        paddingBottom: 5,
    },
})