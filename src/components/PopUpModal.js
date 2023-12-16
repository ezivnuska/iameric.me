import React from 'react'
import {
    Modal,
    Pressable,
    ScrollView,
    Text,
    TouchableOpacity,
    View,
} from 'react-native'
import { Button } from 'antd'

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
                    opacity: 0.9,
                }}
                onPress={onRequestClose}
            />

            <View
                style={{
                    width: 360,
                    minWidth: 360,
                    maxWidth: 360,
                    maxHeight: '90%',
                    marginHorizontal: 'auto',
                    // backgroundColor: '#666',
                    // borderRadius: 10,
                    // borderWidth: 1,
                    // borderColor: '#ddd',
                    // borderStyle: 'dotted',
                    flexBasis: 'auto',
                }}
            >
                <ScrollView
                    style={{
                        width: '100%',
                        padding: 10,
                        // backgroundColor: '#f00',
                    }}
                >
                    {children}
                    <Button
                        size='large'
                        type='text'
                        onClick={onRequestClose}
                        style={{ color: '#eee' }}
                        >
                        Cancel
                    </Button>
                </ScrollView>
            </View>
            
        </View>

    </Modal>
)