import React from 'react'
import { Pressable, ScrollView, View } from 'react-native'
import { DefaultText, Settings } from '@components'
import { Auth, Socket } from '@modules'
import { useApp } from '@app'
import Modal from 'react-native-modal'
import Icon from 'react-native-vector-icons/Ionicons'

const ModalView = ({ modal, onClose }) => {

    const { dims } = useApp()
    
    const renderModalContent = () => {
        const {type, data } = modal
        let content = null
        switch(type) {
            case 'AUTH': content = <Auth />; break
            case 'SETTINGS': content = <Settings />; break
            case 'SOCKETS': content = <Socket />; break
            default: {
                console.log('Ouch', type)
            }
        }
        return content && (
            <ScrollView
                style={{
                    flex: 1,
                    zIndex: 1,
                }}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{
                    flex: 1,
                    paddingVertical: 10,
                    paddingHorizontal: 10,
                }}
            >
                {content}
            </ScrollView>
        )
    }

    const renderHeader = () => {
        let title = null
        switch(modal.type) {
            case 'SETTINGS': title = 'Settings'; break
            case 'SOCKETS': title = 'Sockets'; break
            default:
        }
        return title
            ? (
                <View
                    style={{
                        paddingHorizontal: 10,
                        paddingVertical: 10,
                        zIndex: 50,
                    }}
                >
                    <DefaultText
                        bold
                        size={24}
                        // color='#fff'
                    >
                        {title}
                    </DefaultText>
                </View>
            )
            : null
    }

    return (
        <Modal
            isVisible={modal !== undefined}
            deviceWidth={dims.width}
            deviceHeight={dims.height}
            animationType='fade'
            transparent={true}
            onRequestClose={onClose}
        >
            {/* {isCamera && <View style={{ background: 'yellow', width: 100,  height: 100 }} />} */}
            <View
                style={{
                    flex: 1,
                    flexDirection: 'row',
                    alignItems: 'center',
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
                        width: '92%',
                        maxWidth: 380,
                        marginHorizontal: 'auto',
                        backgroundColor: '#fff',
                        borderRadius: 10,
                        overflow: 'hidden',
                        zIndex: 100,
                    }}
                >

                    {modal && (
                        <View
                            style={{
                                flex: 1,
                                width: '100%',
                                position: 'relative',
                                zIndex: 10,
                            }}
                        >
                            
                            {renderHeader()}    

                            <Pressable
                                onPress={onClose}
                                style={{
                                    position: 'absolute',
                                    top: 0,
                                    // left: 0,
                                    right: 0,
                                    zIndex: 100,
                                    paddingVertical: 10,
                                    paddingHorizontal: 5,
                                }}
                            >
                                <Icon
                                    name={'close'}
                                    size={36}
                                />
                            </Pressable>

                            {renderModalContent()}

                        </View>
                    )}
                </View>

            </View>
        </Modal>
    )
}

export default ModalView