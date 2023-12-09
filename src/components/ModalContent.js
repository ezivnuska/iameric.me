import React from 'react'
import {
    Modal,
    Pressable,
    ScrollView,
    Text,
    TouchableOpacity,
    View,
} from 'react-native'

export default ({ children, label, onRequestClose, ...props }) => (
    <Modal
        {...props}
        animationType='slide'
        transparent={true}
        onRequestClose={onRequestClose}
        style={{
            position: 'relative',
            height: '100%',

            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'flex-end',
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

        <Pressable
            style={{ flexGrow: 1 }}
            onPress={onRequestClose}
        />

        <View
            style={{
                maxWidth: 375,
                minWidth: 375,
                width: 375,
                minHeight: '70%',
                marginHorizontal: 'auto',

                flexGrow: 0,
                flexBasis: 'auto',
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
                    backgroundColor: '#fff',
                }}
            >
                {children}
            </ScrollView>
        </View>

    </Modal>
)