import React from 'react'
import { Pressable, View } from 'react-native'

const ModalContainer = ({ children, landscape, onClose, fullscreen = false }) => {
    
    return (
        <View
            style={{
                flex: 1,
                flexDirection: 'row',
                alignItems: fullscreen ? 'stretch' : 'center',
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
                    // maxWidth: !landscape ? 400 : null,
                    // maxHeight: landscape ? 400 : null,
                    marginHorizontal: 'auto',
                    // paddingVertical: 10,
                    zIndex: 100,
                }}
            >

                {fullscreen ? (
                    <View
                        style={{
                            flex: 1,
                        }}
                    >
                        {children}
                    </View>
                ) : (
                    <View
                        style={{
                            flex: 1,
                            width: '100%',
                            // maxWidth: '92%',
                            maxWidth: '92%',
                            marginHorizontal: 'auto',
                            backgroundColor: '#fff',
                            borderRadius: 10,
                            overflow: 'hidden',
                            zIndex: 100,
                        }}
                    >
                        <View
                            style={{
                                // flexGrow: 1,
                                paddingHorizontal: fullscreen ? 0 : 10,
                                paddingVertical: 10,
                            }}
                        >
                            {children}
                        </View>
                    </View>
                )}

            </View>
        </View>
    )
}

export default ModalContainer