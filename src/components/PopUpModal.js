import React from 'react'
import {
    Modal,
    Pressable,
    ScrollView,
    Text,
    TouchableOpacity,
    View,
} from 'react-native'

export default ({ children, onRequestClose, ...props }) => (
    <Modal
        {...props}
        animationType='fade'
        transparent={true}
        onRequestClose={onRequestClose}
    >
        <View
            style={{
                position: 'relative',
                height: '100%',

                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
            }}
        >

            <Pressable
                style={{
                    position: 'absolute',
                    top: 0,
                    right: 0,
                    bottom: 0,
                    left: 0,

                    backgroundColor: '#000',
                    opacity: 0.8,
                }}
                onPress={onRequestClose}
            />

            <View
                style={{
                    maxWidth: 375,
                    minWidth: 375,
                    width: 375,
                    maxHeight: '90%',
                    marginHorizontal: 'auto',
                    // backgroundColor: '#ccc',

                    flexBasis: 'auto',
                }}
            >   
                <ScrollView
                    style={{
                        width: '100%',
                        padding: 15,
                        // backgroundColor: '#f00',
                    }}
                >
                    {children}
                </ScrollView>
            </View>
        </View>

    </Modal>
)