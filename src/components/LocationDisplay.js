import React, { useContext, useEffect, useState } from 'react'
import {
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native'
import {
    LocationForm,
    LocationDetails,
    ModalContainer,
} from '.'
import {
    PlusCircleOutlined,
} from '@ant-design/icons'
import { AppContext } from '../AppContext'
import axios from 'axios'

const initialState = {
    address1: '',
    address2: '',
    city: '',
    state: '',
    zip: '',
}

const LocationDisplay = props => {

    const {
        dispatch,
        state,
    } = useContext(AppContext)

    const { user } = state

    const [location, setLocation] = useState(null)
    const [modalVisible, setModalVisible] = useState(false)

    useEffect(() => {
        getLocation()
    }, [])

    // useEffect(() => {
    //     console.log('location changed', location)
    // }, [location])

    const getLocation = () => {
        axios
            .get(`/api/user/location/${user._id}`)
            .then(({ data }) => {
                setLocation(data.location || initialState)
            })
            .catch(err => console.log('Error getting location:', err))
    }

    const onSubmitAddress = async newLocation => {
        setModalVisible(false)
        const address = await axios
            .post('/api/location', newLocation)
            .then(({ data }) => data.location)
            .catch(err => {
                console.log('Error saving location', err)
                return null
            })
        
        if (address) setLocation(address)
    }

    return location ? (
        <View style={styles.container}>
            
            <View style={styles.displayHeader}>
                <Text style={styles.title}>Location</Text>
                <View style={styles.buttonContainer}>
                    <TouchableOpacity
                        style={styles.headerButton}
                        onPress={() => setModalVisible(true)}
                    >
                        <PlusCircleOutlined
                            style={{ fontSize: 22 }}
                        />
                    </TouchableOpacity>
                </View>
            </View>

            <LocationDetails
                location={location}
            />

            <ModalContainer
                animationType='slide'
                transparent={false}
                visible={modalVisible}
                closeModal={() => setModalVisible(false)}
            >
                <LocationForm
                    location={location}
                    onSubmit={onSubmitAddress}
                />
            </ModalContainer>
        </View>
    ) : null
}

export default LocationDisplay

const styles = StyleSheet.create({
    container: {
        paddingVertical: 10,
        paddingHorizontal: 20,
    },
    displayHeader: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'flex-start',
        // borderWidth: 1,
        // borderColor: 'blue',
    },
    title: {
        // flex: 1,
        // flexBasis: 'auto',
        // flexGrow: 0,
        // flexShrink: 1,
        fontSize: 24,
        // lineHeight: 30,
        // borderWidth: 1,
        // borderColor: 'green',
    },
    buttonContainer: {
        paddingVertical: 2,
        paddingHorizontal: 5,
        // display: 'flex',
        // flexDirection: 'row',
        // alignItems: 'stretch',
        // lineHeight: 60,
        // borderWidth: 1,
        // borderStyle: 'dotted',
        // borderColor: 'purple',
    },
    headerButton: {
        alignContent: 'center',
        flex: 1,
        flexGrow: 0,
        flexShrink: 1,
        flexBasis: 'auto',
        // lineHeight: 30,
        height: 30,
        // width: 30,
        // borderWidth: 1,
        // borderColor: 'red',
    },
})