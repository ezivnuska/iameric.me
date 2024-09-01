import React, { useEffect, useMemo, useRef, useState } from 'react'
import {
    Animated,
    Pressable,
    View,
} from 'react-native'
import { Screen } from './components'
import {
    Heading,
    ThemedText,
} from '@components'
import { BipMap, Bipster } from '@modules'
import { useBips } from '@bips'
import { useModal } from '@modal'
import { useSocket } from '@socket'
import { loadBips } from '@utils/bips'
import Icon from 'react-native-vector-icons/Ionicons'

export default props => {
    const {
        addBip,
        bips,
        bipsLoading,
        removeBip,
        setBips,
        setBipsLoading,
    } = useBips()
    const {
        socket,
    } = useSocket()

    // const container = useRef()
    // const map = useRef()
    // const pad = useRef()

    const { setNewModal } = useModal()
    const [ alerted, setAlerted ] = useState(false)
    const [ currentBipIndex, setCurrentBipIndex ] = useState(null)
    // const [ containerHeight, setContainerHeight ] = useState(0)
    // const [ padPosition, setPadPosition ] = useState(null)
    // const [ dragging, setDragging ] = useState(false)
    // const [ startPosition, setStartPosition ] = useState(null)

    // const [animatedValue, setAnimatedValue] = useState(new Animated.Value(0))

    // const updateSize = () => {
    //     Animated.timing(animatedValue, {
    //         toValue: padPosition,//percentage * sliderWidth,
    //         duration: 100,
    //         useNativeDriver: true,
    //     }).start()
    // }

    // const init = async () => {
    //     if (navigator.geolocation) {
    //         navigator.geolocation.getCurrentPosition(position => {
    //             const { latitude, longitude } = position.coords
    //             setLocation({ latitude, longitude })
    //         })
    //     } else {
    //         console.log('Geolocation is not supported by this browser.')
    //     }
    // }

    useEffect(() => {
        const fetchBips = async () => {
            setBipsLoading(true)
            const bips = await loadBips()
            setBipsLoading(false)
            if (bips) setBips(bips)
        }
        if (!bips || !bips.length) {
            fetchBips()
        }
        
        // init()
        // if (!currentBipIndex) {
        // //     // setCurrentBipIndex(null)
        // // } else {
        //     setNewModal('QUICK')
        // }
        socket.on('new_bip', addBip)
        socket.on('deleted_bip', removeBip)
    }, [])

    // const maxHeight = useMemo(() => {
    //     return animatedValue.interpolate({
    //         inputRange: [0, 1],
    //         outputRange: [100, containerHeight - 130],
    //     })
    // }, [containerHeight])

    // useEffect(() => {
    //     console.log('containerHeight', containerHeight)
    //     if (containerHeight) {
    //         setPadPosition(containerHeight / 2 - 15)
    //     }
    // }, [containerHeight])

    // useEffect(() => {
    //     console.log('maxHeight', maxHeight)
        
    // }, [maxHeight])
    
    // useEffect(() => {
    //     console.log('padPosition', padPosition)
    // }, [padPosition])

    // useEffect(() => {
    //     console.log('animatedValue', animatedValue)
    //     updateLayout(1)
    // }, [animatedValue])

    // useEffect(() => {
    //     console.log('maxHeight', maxHeight)
    //     if (maxHeight) setAnimatedValue(maxHeight)
    // }, [maxHeight])

    // const listHeight = useMemo(() => containerHeight - (padPosition + 30), [containerHeight, padPosition])

    useEffect(() => {
        if (!alerted) {
            setAlerted(true)
            setNewModal('QUICK')
        }
    }, [currentBipIndex])

    // useEffect(() => {
    //     console.log('dragging', dragging)
    // }, [dragging])

    // const updatePadPosition = position => {
    //     setPadPosition(position)
    //     // setStartPosition(position)
    // }

    const onBipSelected = index => {
        setCurrentBipIndex(index)
    }

    // const handleTouchMove = e => {
    //     if (dragging) {
    //         console.log('moving...', e)
    //         // console.log('TYPE', e.nativeEvent)
    //         const { movementY } = e.nativeEvent
    //         console.log('movementY', movementY)
    //         updatePadPosition(startPosition + movementY)
    //     }
    // }
    
    // const handleTouchEnd = e => {
    //     console.log('touch end', e)
    //     if (dragging) {
    //         setDragging(false)
    //         const { clientY } = e.nativeEvent
    //         console.log(startPosition - clientY < 0 ? 1 : 0)
    //         updateLayout(startPosition - clientY < 0 ? 1 : 0)
    //         // const { movementY } = e.nativeEvent
    //         // console.log('movementY', movementY)
    //         // const needsUpdate = Math.abs(10 - movementY) > 10
    //         // if (needsUpdate) updateLayout(movementY > 0 ? 0 : 1)
    //         // updatePadPosition(movementY)
    //     }
    // }

    // const handleTouchStart = e => {
    //     console.log('touch started', e)
    //     setDragging(true)
    //     const { clientY } = e.nativeEvent
    //     setStartPosition(clientY)
    //     // // console.log('end-clientY', clientY)
    //     // updatePadPosition(clientY)

    // }

    // const updateLayout = value => {
    //     console.log('updating layout', value)
    //     Animated.timing(animatedValue, {
    //         toValue: value === 1 ? 500 : 100,//padPosition,//percentage * sliderWidth,
    //         duration: 100,
    //         useNativeDriver: true,
    //     }).start()
    // }

    return (
        <Screen
            {...props}
            secure={true}
        >
    
            <View style={{ flex: 1 }}>
    
                <Heading
                    title={`Bipster - ${bips.length} bip${bips.length !== 0 ? 's' : ''}`}
                >
                    <View
                        style={{
                            flexDirection: 'row',
                            justifyContent: 'flex-end',
                            alignItems: 'center',
                        }}
                    >
                        <Pressable
                            onPress={() => setNewModal('CAPTURE')}
                            style={{
                                flexDirection: 'row',
                                justifyContent: 'flex-end',
                                alignItems: 'center',
                                gap: 10,
                            }}
                        >
                            <ThemedText color='tomato' bold>Capture Bip</ThemedText>
                            <Icon
                                name='camera-sharp'
                                size={30}
                                color='tomato'
                            />
                        </Pressable>
                    </View>
                </Heading>
                
                <View
                    // ref={container}
                    // onPointerUp={handleTouchEnd}
                    // onTouchEnd={handleTouchEnd}
                    // onLayout={e => setContainerHeight(e.nativeEvent.target.clientHeight)}
                    style={{
                        flex: 1,
                        flexGrow: 1,
                        gap: 10,
                    }}
                >
                    <View
                        // ref={map}
                        style={{
                            flex: 1,
                            // flexBasis: 'auto',
                            // flexGrow: 1,
                            // height: maxHeight,
                            // maxHeight: maxHeight,
                        }}
                    >
                        <BipMap
                            currentIndex={currentBipIndex}
                            onBipSelected={onBipSelected}
                        />
                    </View>
                    
                    {/* <Pressable
                        ref={pad}
                        onPointerDown={handleTouchStart}
                        // onPointerMove={handleTouchMove}
                        onTouchStart={handleTouchStart}
                        // onTouchMove={handleTouchMove}
                        style={{
                            flexBasis: 30,
                            // flexGrow: 0,
                            // flexDirection: 'row',
                            // justifyContent: 'center',
                            // backgroundColor: '#eee',
                            // borderRadius: 8,
                            // overflow: 'hidden',
                            // marginVertical: 5,
                            flexDirection: 'row',
                            alignItems: 'center',
                        }}
                    >
                        <Icon
                            name='menu-sharp'
                            size={18}
                            color='#ccc'
                            style={{ marginHorizontal: 'auto' }}
                        />
                    </Pressable> */}
                    <View
                        style={{
                            flex: 1,
                            // flexShrink: 0,
                            // flexBasis: 'auto',
                            // minHeight: 70,
                        }}
                    >
                        {bipsLoading
                            ? <ThemedText>Loading Bips...</ThemedText>
                            : bips.length > 0
                                ? (
                                    <Bipster
                                        bips={bips}
                                        currentIndex={currentBipIndex}
                                        onSelected={onBipSelected}
                                    />
                                )
                                : <ThemedText bold>No bips to report.</ThemedText>
                        }
                    </View>
                </View>
    
            </View>
    
        </Screen>
    )
}