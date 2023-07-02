import React, { useEffect, useState } from 'react'
import {
    StyleSheet,
    Text,
    View,
} from 'react-native'
import {
    EntryForm,
    EntryList,
} from '.'

const EntryModule = () => {
    
    const [entries, setEntries] = useState([])
    
    // useEffect is a react hook that is called whenever
    // the variable(s) in the ending array have changed.
    // if the ending array is empty, the function will be 
    // called when the component mounts.

    useEffect(() => {
        console.log('entries changed...', entries)
    }, [entries])

    const onSubmit = value => {

        setEntries([...entries, value])

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
            
            <EntryForm
                onSubmit={onSubmit}
            />

            {
                entries.length
                    ? (
                        <EntryList
                            items={entries}
                            deleteItem={deleteEntryAtIndex}
                        />
                    )
                    : <Text>No entries.</Text>
            }

        </View>
    )
}

export default EntryModule

const styles = StyleSheet.create({
    container: {
        
    },
})