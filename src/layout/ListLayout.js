import React, { useEffect, useState } from 'react'
import {
    Dimensions,
    FlatList,
    StyleSheet,
} from 'react-native'
import { Header } from '.'
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
        <FlatList
            data={[
                <Header />,
                <Navigation />
            ]}
            keyExtractor={(item, index) => 'key' + index}
            renderItem={({ item }) => item}
            style={[styles.list, {
                width: dimensions.window.width,
                // height: dimensions.window.height - 50,
            }]}
        />
    )
}

export default ListLayout

const styles = StyleSheet.create({
    list: {
        // position: 'absolute',
        // left: 0,
        // right: 0,
        // top: 50,
        // bottom: 0,
        // display: 'flex',
        // flexDirection: 'column',
        // justifyContent: 'flex-start',
        // minHeight: '100%',
        // borderWidth: 5,
        // borderColor: 'red',
    },
})