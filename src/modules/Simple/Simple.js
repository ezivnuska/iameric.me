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
    const [inputValue, setInputValue] = useState('')

    // create array to store comments in state
    const [comments, setComments] = useState([])

    // method to handle button press
    const handlePress = () => {
        console.log('saving comment:', inputValue)
        
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
        setComments([...comments, inputValue])

        // clear text values
        setInputValue('')
    }

    // loop through comments and return list item as jsx element
    const renderComments = () => comments.length ? comments.map((value, index) => (
        <Text
            key={`saved-value-${index}`}
            style={styles.commentListItem}
        >
            {value}
        </Text>
    )) : (
        <Text style={styles.emptyNote}>
            No comments.
        </Text>
    )

    return (
        <View style={styles.container}>

            {/* header */}
            <Text style={styles.header}>
                Comment List Example
            </Text>

            {/* flex container for textinput and button */}
            <View style={styles.inputContainer}>

                {/* input field */}
                <TextInput
                    value={inputValue}
                    onChangeText={setInputValue}
                    placeholder='write something...'
                    placeholderTextColor='#aaa'
                    style={styles.textInput}
                />

                {/* button to init save */}
                <Pressable
                    onPress={handlePress}
                    disabled={!inputValue.length}
                    style={[
                        styles.button,
                        inputValue.length ? styles.buttonEnabled : styles.buttonDisabled,
                        { flexBasis: 40, flexGrow: 0 },
                    ]}
                >
                    <Text
                        style={[
                            styles.buttonLabel,
                            inputValue.length ? styles.buttonLabelEnabled : styles.buttonLabelDisabled,
                        ]}
                    >
                        {`>`}
                    </Text>

                </Pressable>

            </View>

            {/* text value preview */}
            <Text style={styles.textPreview}>
                {inputValue}
            </Text>
            
            {/* container for comment list header, comments, and clear button */}
            <View style={styles.commentListContainer}>
                
                {/* comment list header */}
                <Text style={[styles.header]}>
                    Comments {comments.length ? `(${comments.length})` : ''}
                </Text>
                
                <View style={styles.commentList}>
                    {/* render all comments or show empty notification */}
                    {renderComments()}
                </View>
                
                {/* button to clear comment list */}
                {(comments.length > 0) && (
                    <Pressable
                        onPress={() => setComments([])}
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
            {/* render saved values in value list */}

        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        margin: 10,
        padding: 10,
        // backgroundColor: '#efe',
        borderWidth: 1,
        borderColor: '#999',
        borderRadius: 6,
        overflow: 'hidden',
        gap: 10,
    },
    header: {
        fontSize: 20,
        fontWeight: 700,
        color: '#333',
    },
    inputContainer: {
        flexDirection: 'row',
        gap: 5,
    },
    textInput: {
        flexGrow: 1,
        paddingVertical: 4,
        paddingHorizontal: 10,
        // marginBottom: 5,
        height: 40,
        lineHeight: 40,
        fontSize: 18,
        backgroundColor: '#fff',
        borderWidth: 1,
        borderColor: '#6c6',
        borderRadius: 6,
        overflow: 'hidden',
    },
    textPreview: {
        paddingHorizontal: 5,
        // marginBottom: 5,
        height: 26,
        minHeight: 26,
        lineHeight: 26,
        fontSize: 16,
    },
    button: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        height: 40,
        borderRadius: 6,
        overflow: 'hidden',
    },
    buttonEnabled: {
        backgroundColor: '#6c6',
    },
    buttonDisabled: {
        borderWidth: 1,
        borderColor: '#ccc',
        backgroundColor: '#eee',
        textColor: '#ccc',
    },
    buttonLabel: {
        fontWeight: 700,
        height: 20,
        lineHeight: 20,
        fontSize: 18,
    },
    buttonLabelEnabled: {
        color: '#fff',
    },
    buttonLabelDisabled: {
        color: '#aaa',
    },
    commentListContainer: {
        // marginTop: 10,
        paddingVertical: 10,
        paddingHorizontal: 10,
        backgroundColor: '#fff',
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 6,
        overflow: 'hidden',
        gap: 7,
    },
    commentList: {
        gap: 3,
    },
    commentListItem: {
        fontSize: 18,
        lineHeight: 20,
        minHeight: 26,
        paddingHorizontal: 10,
        paddingVertical: 7,
        backgroundColor: '#fff',
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 6,
        overflow: 'hidden',
    },
    emptyNote: {
        fontSize: 18,
        lineHeight: 20,
        minHeight: 26,
        paddingHorizontal: 10,
        paddingVertical: 7,
    },
})