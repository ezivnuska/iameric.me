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
    EditOutlined,
    PlusCircleOutlined,
} from '@ant-design/icons'
import { AppContext } from '../AppContext'
import axios from 'axios'
import defaultStyles from '../styles'

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
                
                <Text style={defaultStyles.heading}>Location</Text>
                
                <View style={styles.buttons}>
                    <TouchableOpacity
                        style={styles.headerButton}
                        onPress={() => setModalVisible(true)}
                    >
                        {location
                            ? <EditOutlined style={{ fontSize: 20, color: '#fff' }} />
                            : <PlusCircleOutlined style={{ fontSize: 20, color: '#fff' }} />
                        }
                        
                    </TouchableOpacity>
                </View>
            </View>

            {location ? <LocationDetails location={location} /> : null}

            <ModalContainer
                animationType='slide'
                transparent={false}
                visible={modalVisible}
                closeModal={() => setModalVisible(false)}
                label={'Location Form'}
            >
                <LocationForm
                    location={location}
                    onSubmit={onSubmitAddress}
                />
            </ModalContainer>
        </View>
    )
}

export default LocationDisplay

const styles = StyleSheet.create({
    container: {
        padding: 10,
    },
    displayHeader: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'flex-start',
        marginBottom: 15,
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
        marginVertical: 4,
        marginHorizontal: 7,
    },
})