import React from 'react'
import {
    Modal,
    ScrollView,
    Text,
    TouchableOpacity,
    View,
} from 'react-native'
import base from '../styles/base'
import layout from '../styles/layout'
import main from '../styles/main'

export default ({ children, label, onRequestClose, ...props }) => {

    return (
        <View style={{
            // flex: 1,
            // justifyContent: 'center',
            // alignItems: 'center',
            // marginTop: 22,
            // width: '100%',
        }}>
            <Modal
                {...props}
                animationType='slide'
                transparent={true}
                onRequestClose={onRequestClose}
                style={{
                    position: 'relative',
                }}
            >
                <TouchableOpacity
                    onPress={onRequestClose}
                    style={{
                        // flex: 1,
                        // justifyContent: 'center',
                        // alignItems: 'center',
                        // marginTop: 22,
                        backgroundColor: '#000',
                        opacity: 0.65,
                        position: 'absolute',
                        top: 0,
                        right: 0,
                        bottom: 0,
                        left: 0,
                    }}
                />
                
                <View
                    style={{
                        flex: 3,
                        marginTop: 40,
                        marginHorizontal: 5,
                        backgroundColor: 'white',
                        borderTopLeftRadius: 25,
                        borderTopRightRadius: 25,
                    }}
                >
                    {label && (
                        <Text
                            style={{
                                backgroundColor: '#48a',
                                textAlign: 'center',
                                color: '#fff',
                                borderTopLeftRadius: 25,
                                borderTopRightRadius: 25,
                                lineHeight: 50,
                                fontSize: 22,
                                fontWeight: 600,
                            }}
                        >
                            {label}
                        </Text>
                    )}
                    
                    <ScrollView
                        style={{
                            width: '100%',
                            padding: 15,
                        }}
                    >
                        {children}
                    </ScrollView>

                </View>

            </Modal>
        </View>
    )
}