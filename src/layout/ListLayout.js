import React, { useEffect, useState } from 'react'
import {
    Dimensions,
    FlatList,
    StyleSheet,
    View,
} from 'react-native'
import { Body, Header } from '.'
import { Navigation } from '../navigators'

const windowDimensions = Dimensions.get('window');
const screenDimensions = Dimensions.get('screen');

const ListLayout = () => {
    
    const [dimensions, setDimensions] = useState({
        window: windowDimensions,
        screen: screenDimensions,
    })

    useEffect(() => {
        const subscription = Dimensions.addEventListener(
            'change',
            ({ window, screen }) => {
                setDimensions({ window, screen })
            }
        )
        return () => subscription.remove()
    }, [])

    return (
        <View style={[styles.layoutContainer, { width: dimensions.window.width }]}>
            <FlatList
                data={[
                    <Header />,
                    <Navigation />
                ]}
                keyExtractor={(item, index) => 'key' + index}
                renderItem={({ item }) => item}
                style={styles.content}
            />
        </View>
    )
}

export default ListLayout

const styles = StyleSheet.create({
    layoutContainer: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-start',
        height: '100%',
        minHeight: '100%',
        // borderWidth: 5,
        // borderColor: 'red',
    },
    content: {
        marginHorizontal: 'auto',
        width: '100%',
        minWidth: 350,
        maxWidth: 400,
        borderWidth: 1,
        borderColor: 'red',
    },
})