import React from 'react'
import { Pressable, ScrollView, View } from 'react-native'
import { ThemedText } from '@components'
import { Auth, Settings, Socket } from '@modules'
import Modal from 'react-native-modal'
import Icon from 'react-native-vector-icons/Ionicons'
import LinearGradient from 'react-native-web-linear-gradient'

const ModalView = ({ modal, onClose }) => {
    
    const renderModalContent = () => {
        const {type, data } = modal
        switch(type) {
            case 'AUTH': return <Auth />; break
            case 'SETTINGS': return <Settings />; break
            case 'SOCKETS': return <Socket />; break
            default: {
                console.log('Ouch', type)
            }
        }
    }

    const renderHeader = () => {
        let title
        switch(modal.type) {
            case 'AUTH': title = 'Who are You?'; break
            case 'SETTINGS': title = 'Settings'; break
            case 'SOCKETS': title = 'Sockets'; break
            default: title = ''
        }
        return title
            ? (
                <View
                    style={{
                        paddingHorizontal: 10,
                        paddingVertical: 15,
                        zIndex: 50,
                    }}
                >
                    <ThemedText
                        bold
                        size={24}
                        color='#fff'
                    >
                        {title}
                    </ThemedText>
                </View>
            )
            : null
    }
    return (
        <Modal
            isVisible={modal !== undefined}
            animationType='fade'
            transparent={true}
            onRequestClose={onClose}
            style={{
                flex: 1,
                margin: 0,
            }}
        >
            {/* {isCamera && <View style={{ background: 'yellow', width: 100,  height: 100 }} />} */}
            <View
                style={{
                    flex: 1,
                    width: '100%',
                    position: 'relative',
                }}
            >
                <Pressable
                    onPress={onClose}
                    style={{
                        position: 'absolute',
                        top: 0,
                        right: 0,
                        bottom: 0,
                        left: 0,
                        zIndex: 1,
                    }}
                />

                <View
                    style={{
                        flex: 1,
                        width: '100%',
                        maxWidth: 400,
                        marginHorizontal: 'auto',
                        backgroundColor: '#fff',
                        zIndex: 100,
                    }}
                >

                    {modal && (
                        <View
                            style={{
                                flex: 1,
                                width: '100%',
                                // paddingBottom: 10,
                                // paddingHorizontal: 10,
                                position: 'relative',
                                zIndex: 10,
                            }}
                        >
                            <LinearGradient
                                colors={[
                                    // 'rgba(0, 0, 0, 1.0)',
                                    'rgba(0, 0, 0, 0.9)',
                                    'rgba(0, 0, 0, 0.6)',
                                    'rgba(0, 0, 0, 0.3)',
                                    'rgba(0, 0, 0, 0.1)',
                                    'rgba(0, 0, 0, 0.0)',
                                ]}
                                style={{
                                    position: 'absolute',
                                    top: 0,
                                    right: 0,
                                    left: 0,
                                    height: 70,
                                    zIndex: 50,
                                }}
                            >
                                {renderHeader()}
                            </LinearGradient>

                            <Pressable
                                onPress={onClose}
                                style={{
                                    paddingVertical: 10,
                                    paddingHorizontal: 5,
                                    position: 'absolute',
                                    top: 0,
                                    // left: 0,
                                    right: 0,
                                    zIndex: 100,
                                }}
                            >
                                <Icon
                                    name={'close'}
                                    size={40}
                                    color='#fff'
                                />
                            </Pressable>

                            <ScrollView
                                style={{
                                    flex: 1,
                                    zIndex: 1,
                                }}
                                showsVerticalScrollIndicator={false}
                                contentContainerStyle={{
                                    flex: 1,
                                    paddingVertical: 70,
                                    paddingHorizontal: 10,
                                }}
                            >
                                {renderModalContent()}

                            </ScrollView>
                        </View>
                    )}
                </View>
            </View>
        </Modal>
    )
}

export default ModalView