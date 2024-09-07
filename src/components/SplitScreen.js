import React, { useEffect, useRef, useState } from 'react'
import {
    Animated,
    Easing,
    Pressable,
    View,
} from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons'

export default ({ state, change, children }) => {

    const [ containerHeight, setContainerHeight ] = useState(null)
    
    const transition = useRef(new Animated.Value(state)).current
    
    useEffect(() => {
        animate(state)
    }, [state])

    const animate = toValue => {
		Animated.timing(transition, {
			toValue,
			duration: 500,
			useNativeDriver: true,
            easing: Easing.inOut(Easing.quad),
		}).start()
    }

    return (
        <View
            onLayout={e => setContainerHeight(e.nativeEvent.target.clientHeight)}
            style={{
                flex: 1,
            }}
        >
            {(containerHeight !== null) && (
                <View
                    style={{
                        flex: 1,
                    }}
                >
                    <View
                        style={{
                            flexBasis: 'auto',
                            flexShrink: 1,
                        }}
                    >
                        <Animated.View
                            style={{
                                gap: 2,
                                height: transition.interpolate({
                                    inputRange: [0, 1],
                                    outputRange: [130, containerHeight - 100],
                                }),
                            }}
                        >
                            <View
                                style={{
                                    flex: 1,
                                    flexShrink: 1,
                                }}
                            >
                                {/* upper content */}
                                {children[0]}
                            </View>
                            
                            <View
                                style={{
                                    flexBasis: 'auto',
                                    flexShrink: 0,
                                    flexGrow: 0,
                                    flexDirection: 'row',
                                    justifyContent: 'space-evenly',
                                    alignItems: 'center',
                                }}
                            >

                                <Pressable
                                    onPress={() => change(1)}
                                    disabled={state === 1}
                                    style={{
                                        flex: 1,
                                        // flexBasis: 30,
                                        flexDirection: 'row',
                                        alignItems: 'center',
                                        borderRadius: 8,
                                        overflow: 'hidden',
                                        opacity: state === 1 ? 0.25 : 1,
                                    }}
                                >
                                    <Icon
                                        name='chevron-down-sharp'
                                        size={24}
                                        color='#000'
                                        style={{ marginHorizontal: 'auto' }}
                                    />
                                </Pressable>

                                <Pressable
                                    onPress={() => change(0.5)}
                                    disabled={state === 0.5}
                                    style={{
                                        flex: 1,
                                        // flexBasis: 30,
                                        flexDirection: 'row',
                                        alignItems: 'center',
                                        borderRadius: 8,
                                        overflow: 'hidden',
                                        opacity: state === 0.5 ? 0.25 : 1,
                                    }}
                                >
                                    <Icon
                                        name='reorder-two-sharp'
                                        size={24}
                                        color='#000'
                                        style={{ marginHorizontal: 'auto' }}
                                    />
                                </Pressable>

                                <Pressable
                                    onPress={() => change(0)}
                                    disabled={state === 0}
                                    style={{
                                        flex: 1,
                                        // flexBasis: 30,
                                        flexDirection: 'row',
                                        alignItems: 'center',
                                        borderRadius: 8,
                                        overflow: 'hidden',
                                        opacity: state === 0 ? 0.25 : 1,
                                    }}
                                >
                                    <Icon
                                        name='chevron-up-sharp'
                                        size={24}
                                        color='#000'
                                        style={{ marginHorizontal: 'auto' }}
                                    />
                                </Pressable>
                            </View>
                            
                        </Animated.View>
                    </View>
                    <View
                        style={{
                            flex: 1,
                            flexShrink: 1,
                        }}
                    >
                        <View
                            style={{
                                flex: 1,
                                flexShrink: 1,
                                paddingVertical: 0,
                                borderWidth: 1,
                                borderColor: '#aaa',
                                borderRadius: 8,
                                overflow: 'hidden',
                                backgroundColor: 'rgba(230, 230, 230, 0.15)',
                            }}
                        >
                            {/* lower content */}
                            {children[1]}
                        </View>
                    </View>

                </View>
            )}
        </View>
    )
}