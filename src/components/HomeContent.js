import React from 'react'
import {
    StyleSheet,
} from 'react-native'
import {
    Zach,
} from '.'

const HomeContent = () => {

    return (
        <Zach />
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
})