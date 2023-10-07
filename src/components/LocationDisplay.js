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
    ModalContent,
} from '.'
import {
    EditOutlined,
    PlusCircleOutlined,
} from '@ant-design/icons'
import { AppContext } from '../AppContext'
import axios from 'axios'
import main from '../styles/main'
import layout from '../styles/layout'

const initialState = {
    address1: '',
    address2: '',
    city: '',
    state: '',
    zip: '',
}

const LocationDisplay = ({ details }) => {

    const {
        dispatch,
        state,
        user,
    } = useContext(AppContext)

    const [location, setLocation] = useState(null)
    const [modalVisible, setModalVisible] = useState(false)

    useEffect(() => {
        getLocation()
    }, [])

    const getLocation = async () => {
        const { data } = await axios
            .get(`/api/user/location/${user._id}`)

        if (!data) {
            console.log('Error getting location:')
            return
        }

        setLocation(data.location || initialState)
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

    return (
        <View style={styles.container}>
            
            <View style={styles.displayHeader}>
                
                <Text style={[main.subheading, styles.heading]}>Address</Text>
                
                <View style={styles.buttons}>
                    <TouchableOpacity
                        style={styles.headerButton}
                        onPress={() => setModalVisible(true)}
                    >
                        {location
                            ? <EditOutlined style={{ fontSize: 20 }} />
                            : <PlusCircleOutlined style={{ fontSize: 20 }} />
                        }
                        
                    </TouchableOpacity>
                </View>
            </View>

            {location ? <LocationDetails location={location} /> : null}

            <ModalContent
                animationType='slide'
                transparent={false}
                visible={modalVisible}
                onRequestClose={() => setModalVisible(false)}
                label={'Manage Location'}
            >
                <LocationForm
                    location={location}
                    onSubmit={onSubmitAddress}
                />
            </ModalContent>
            
        </View>
    )
}

export default LocationDisplay

const styles = StyleSheet.create({
    container: {
        marginVertical: layout.verticalMargin,
    },
    displayHeader: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'flex-start',
        // marginBottom: 15,
    },
    title: {
        fontSize: 24,
    },
    buttons: {
        flex: 1,
        flexGrow: 0,
        flexShrink: 1,
        flexBasis: 'auto',
    },
    headerButton: {
        // marginVertical: 4,
        marginHorizontal: 7,
    },
    heading: {
        marginBottom: 5,
    },
})