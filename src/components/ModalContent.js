import React from 'react'
import {
    Modal,
    ScrollView,
    Text,
    TouchableOpacity,
    View,
} from 'react-native'

export default ({ children, label, onRequestClose, ...props }) => {

    return (
        <View>
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
                        marginHorizontal: 'auto',
                        backgroundColor: 'white',
                        borderTopLeftRadius: 25,
                        borderTopRightRadius: 25,
                        width: 375,
                        minWidth: 350,
                        maxWidth: 375,
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