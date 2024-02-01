import React from 'react'
import {
    Modal,
    Pressable,
    ScrollView,
    View,
} from 'react-native'
import {
    IconButton,
} from '.'
import { useTheme } from 'react-native-paper'

export default ({ children, onRequestClose, ...props }) => {
    
    const theme = useTheme()

    return (
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
                        backgroundColor: theme?.colors.background,
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
                            paddingVertical: 10,
                            // backgroundColor: '#f00',
                        }}
                    >
                        {children}

                        <IconButton
                            label='Close'
                            onPress={onRequestClose}
                            // iconName='close-outline'
                        />
                        {/* <Button
                            size='large'
                            type='text'
                            onClick={onRequestClose}
                            style={{ color: '#eee' }}
                            >
                            Cancel
                        </Button> */}
                    </ScrollView>
                </View>
                
            </View>

        </Modal>
    )
}