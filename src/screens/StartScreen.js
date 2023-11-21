import React, { useContext, useEffect, useState } from 'react'
import {
    StyleSheet,
    Text,
    View,
} from 'react-native'
import {
    LoadingView,
    CenteredView,
    ModalContent,
    Screen,
    SignUpForm,
    SignInForm,
} from '../components'
import { AppContext } from '../AppContext'
import { Button } from 'antd'
import layout from '../styles/layout'
import main from '../styles/main'
import { checkStatus, connect } from '../Data'
import { navigate } from '../navigators/RootNavigation'

const StartScreen = () => {

    const {
        dispatch,
        loading,
    } = useContext(AppContext)

    const [showSignUpModal, setShowSignUpModal] = useState(false)
    const [showSignInModal, setShowSignInModal] = useState(false)

    useEffect(() => {
        init()
    }, [])

    const init = async () => {
        
        const verifiedUser = await checkStatus()
        
        if (!verifiedUser) {
            console.log('could not verify user.')
        } else {
            setUser(verifiedUser)
        }

        dispatch({ type: 'SET_LOADING', loading: null })
    }

    const onConnect = async type => {

        const { token, ...user } = await connect(type)
        
        if (user) setUser(user)
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
                        <View style={styles.experiences}>
                            <View style={styles.experience}>
                                <Button type='primary' onClick={() => onConnect('customer')}>
                                    Order
                                </Button>
                            </View>
                            <View style={styles.experience}>
                                <Button type='primary' onClick={() => onConnect('vendor')}>
                                    Sell
                                </Button>
                            </View>
                            <View style={styles.experience}>
                                <Button type='primary' onClick={() => onConnect('driver')}>
                                    Deliver
                                </Button>
                            </View>
                            
                        </View>
                        <View style={styles.authButtons}>
                            <View style={styles.authButton}>
                                <Button type='primary' onClick={() => setShowSignUpModal(true)}>
                                    Sign Up
                                </Button>
                            </View>
                            <View style={styles.authButton}>
                                <Button type='primary' onClick={() => setShowSignInModal(true)}>
                                    Sign In
                                </Button>
                            </View>
                        </View>
                    </View>

                </CenteredView>
            ) : <LoadingView label={loading} />}

            <ModalContent
                visible={showSignUpModal}
                onRequestClose={() => setShowSignUpModal(false)}
                label='Sign Up'
            >
                <SignUpForm
                    setUser={setUser}
                />
            </ModalContent>

            <ModalContent
                visible={showSignInModal}
                onRequestClose={() => setShowSignInModal(false)}
                label='Sign In'
            >
                <SignInForm
                    setUser={setUser}
                />
            </ModalContent>
        </Screen>
    )
}

export default StartScreen

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'center',
        height: '20%',
        width: '90%',
        // marginTop: 20,
        marginHorizontal: 'auto',
    },
    experiences: {
        flex: 1,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        alignItems: 'center',
        height: 100,
        width: '100%',
        // marginTop: 20,
        // marginHorizontal: 'auto',
    },
    experience: {
        flex: 1,
        marginHorizontal: 'auto',
        paddingHorizontal: layout.horizontalPadding,
        paddingVertical: layout.verticalPadding,
        // width: 200,
        // minWidth: 300,
        // maxWidth: 400,
        backgroundColor: '#ddd',
        borderRadius: 12,
    },
    authButtons: {
        flex: 1,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        alignItems: 'center',
        height: 100,
        width: '100%',
        // marginTop: 20,
        // marginHorizontal: 'auto',
    },
    authButton: {
        flex: 1,
        // flexBasis: 'auto',
        marginHorizontal: 'auto',
        paddingHorizontal: layout.horizontalPadding,
        paddingVertical: layout.verticalPadding,
        // width: 200,
        // minWidth: 300,
        // maxWidth: 400,
        backgroundColor: '#ddd',
        borderRadius: 12,
    },
    caption: {
        fontWeight: 700,
        textAlign: 'center',
        marginBottom: layout.verticalMargin,
    },
})