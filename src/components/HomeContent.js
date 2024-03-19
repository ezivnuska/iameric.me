import React from 'react'
import {
    Button,
    Text,
    TextInput,
    View,
    StyleSheet,
} from 'react-native'
import {
    TextInputForm,
} from '.'

const HomeContent = () => {
    return (
        <View>
            <Text style={styles.header}>
                socket client
            </Text>
            <View id='chat-box'>
                {/* <ul id='messages'></ul> */}
                {/* <!-- <textarea id='messages' disabled></textarea> --> */}
                <Button
                    id='leave'
                    className='button-neu'
                    title='Leave'
                    style={styles.button}
                />
                <TextInput
                    id='input'
                    style={styles.input}
                    autocomplete='off'
                />
                {/* <button class='button-neu'>Enter</button> */}
            </View>
            <TextInputForm />
        </View>
    )
}

export default HomeContent

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'flex-start',
        flexWrap: 'wrap',
    },
    modules: {
        flex: 1,
        flexShrink: 1,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-start',
        flexWrap: 'wrap',
        width: '50%',
        // minWidth: 300,
        // maxWidth: 450,
    },
    aside: {
        flex: 1,        
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
    header: {

    },
})