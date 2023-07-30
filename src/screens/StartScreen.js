import React, { useContext, useEffect, useState } from 'react'
import {
    StyleSheet,
    View,
} from 'react-native'
import {
    ButtonPrimary,
} from '../components'
import { navigate } from '../navigators/RootNavigation'

const StartScreen = ({ navigation }) => (
    <View style={styles.container}>
        <ButtonPrimary
            label='Customer Experience'
            onPress={() => navigate('customer')}
        />
        
        <ButtonPrimary
            label='Vendor Experience'
            onPress={() => navigate('vendor')}
        />

        <ButtonPrimary
            label='Driver Experience'
            onPress={() => navigate('driver')}
        />
    </View>
)

export default StartScreen

const styles = StyleSheet.create({
    container: {

    },
})