import React, { useState } from 'react'
import {
    Button,
    StyleSheet,
    Text,
    TextInput,
    View,
} from 'react-native'

export default Simple = () => {

    const [textValue, setTextValue] = useState('')
    const [savedValues, setSavedValues] = useState([])

    const handlePress = () => {
        console.log('button pressed', textValue)
        setSavedValues([textValue, ...savedValues])
        setTextValue('')
    }

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
            <TextInput
                value={textValue}
                onChangeText={setTextValue}
                placeholder='write something...'
                placeholderTextColor='#aaa'
                style={styles.textInput}
            />

            <Text
                style={styles.textPreview}
            >
                {textValue}
            </Text>

            <Button
                title='Press Me'
                color='red'
                onPress={handlePress}
            />

            {savedValues.length > 0 && renderSavedValues()}
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        padding: 10,
        backgroundColor: '#ccc',
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