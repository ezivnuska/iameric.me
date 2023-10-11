import React, { useContext, useEffect } from 'react'
import {
    StyleSheet,
    Text,
    View,
} from 'react-native'
import {
    LoadingView,
    CenteredView,
    Screen,
} from '../components'
import { AppContext } from '../AppContext'
import { Button } from 'antd'
import layout from '../styles/layout'
import main from '../styles/main'
import { checkStatus, connect } from '../Data'

const StartScreen = () => {

    const {
        dispatch,
        loading,
    } = useContext(AppContext)

    useEffect(() => {
        authenticate()
    }, [])

    const authenticate = async () => {
        
        const response = await checkStatus(dispatch)
        
        if (response) setUser(response)

        dispatch({ type: 'SET_LOADING', loading: null })
    }

    const onConnect = async type => {

        const response = await connect(dispatch, type)
        
        if (response) setUser(response)
        else console.log(`Error connecting as ${type}.`)
        
        dispatch({ type: 'SET_LOADING', loading: null })
    }

    const setUser = ({
        _id,
        email,
        images,
        profileImage,
        role,
        username,
    }) => {
        dispatch({
            type: 'SET_USER',
            user: {
                _id,
                email,
                images,
                profileImage,
                role,
                username,
            }
        })
    }

    return (
        <Screen>
            {!loading ? (
                <CenteredView>
                    <View style={styles.container}>
                        <View style={styles.experience}>
                            
                            <Text style={[main.text, styles.caption]}>
                                Customer Experience
                            </Text>
                            
                            <Button type='primary' onClick={() => onConnect('customer')}>
                                Order Takeout
                            </Button>

                        </View>

                        <View style={styles.experience}>
                            
                            <Text style={[main.text, styles.caption]}>
                                Vendor Experience
                            </Text>

                            <Button type='primary' onClick={() => onConnect('vendor')}>
                                Make Sales
                            </Button>
                        </View>

                        <View style={styles.experience}>
                            
                            <Text style={[main.text, styles.caption]}>
                                Driver Experience
                            </Text>

                            <Button type='primary' onClick={() => onConnect('driver')}>
                                Make Deliveries
                            </Button>
                        </View>
                    </View>
                </CenteredView>
            ) : <LoadingView label={loading} />}
            
        </Screen>
    )
}

export default StartScreen

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-evenly',
        alignItems: 'stretch',
        height: '100%',
        // width: 250,
        // marginTop: 20,
        marginHorizontal: 'auto',
    },
    experience: {
        // flex: 1,
        marginHorizontal: 'auto',
        paddingHorizontal: layout.horizontalPadding,
        paddingVertical: layout.verticalPadding,
        width: 200,
        minWidth: 300,
        maxWidth: 400,
        backgroundColor: '#ddd',
        borderRadius: 12,
    },
    caption: {
        fontWeight: 700,
        textAlign: 'center',
        marginBottom: layout.verticalMargin,
    },
})