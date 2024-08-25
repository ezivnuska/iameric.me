import React, { useEffect, useMemo, useState, useRef } from 'react'
import { View, StyleSheet, Pressable, Animated } from 'react-native'
import { IconButton } from '@components'
import { useApp } from '@app'
import Icon from 'react-native-vector-icons/Ionicons'

const Slider = ({ zoom, onValueChange }) => {
    const { theme } = useApp()
    const [ value, setValue ] = useState(0)
    const [ sliderWidth, setSliderWidth ] = useState(0)
    const thumbpadRef = useRef()
    const animatedValue = useRef(new Animated.Value(0)).current
    
    const updateValue = xpos => {
        if (xpos < 30) setValue(1)
        else if (xpos > sliderWidth - 30) setValue(sliderWidth)
        else setValue(xpos)
        onValueChange(Number(xpos / sliderWidth).toFixed(2))
    }

    const handleTouchMove = e => {
        const { clientX } = e.nativeEvent.changedTouches[0]
        updateValue(clientX)
    }

    const handleTouchEnd = e => {
        const { clientX } = e.nativeEvent.changedTouches[0]
        updateValue(clientX)
    }

    // const updateSlider = () => {

    //     Animated.timing(animatedValue, {
    //         toValue: value,//percentage * sliderWidth,
    //         duration: 100,
    //         useNativeDriver: true,
    //     }).start()
    // }

    return (
        <Pressable
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
            onLayout={e => {
                setValue(zoom * e.nativeEvent.target.clientWidth)
                setSliderWidth(e.nativeEvent.target.clientWidth)
            }}
            style={{
                width: '100%',
                height: 40,
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                position: 'relative',
                backgroundColor: 'rgba(200, 200, 200, 0.5)',
            }}
        >
            <Icon
                style={{ flexGrow: 0 }}
                name='remove-circle-outline'
                size={32}
                color={theme?.colors.textDefault}
            />
            <Icon
                style={{ flexGrow: 0 }}
                name='search-sharp'
                size={32}
                color={theme?.colors.textDefault}
            />
            <Icon
                style={{ flexGrow: 0 }}
                name='add-circle-outline'
                size={32}
                color={theme?.colors.textDefault}
            />
            <View
                ref={thumbpadRef}
                style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: value,
                    height: 40,
                    backgroundColor: 'rgba(200, 100, 100, 0.5)',
                    // transform: [{ translateX: animatedValue }],
                    // transform: [{ translateX: animatedValue }],
                }}
            />
        </Pressable>
    )

    return (
        <View
            style={styles.sliderContainer}
            onLayout={(e) => {
                setSliderWidth(e.nativeEvent.target.offsetParent.clientWidth - 20)
            }}
        >
            <Pressable
                style={styles.sliderTrack}
                onTouchStart={handleTouchStart}
                onTouchMove={handleTouchMove}
                onTouchEnd={handleTouchEnd}
            >
                <Animated.View
                    ref={thumbpadRef}
                    style={[
                        {
                            width: 20,
                            height: 20,
                            borderRadius: 10,
                            backgroundColor: '#007AFF',
                            position: 'absolute',
                            top: -5,
                            left: value,
                            transform: [{ translateX: animatedValue }],
                        },
                    ]}
                />
            </Pressable>
        </View>
    );
};

export default Slider;

const styles = StyleSheet.create({
    sliderContainer: {
        width: '100%',
        height: 50,
        paddingHorizontal: 10,
        justifyContent: 'center',
    },
    sliderTrack: {
        height: 10,
        backgroundColor: '#ddd',
        borderRadius: 5,
        overflow: 'hidden',
    },
    thumb: {
        width: 20,
        height: 20,
        borderRadius: 10,
        backgroundColor: '#007AFF',
        position: 'absolute',
        top: -5,
    },
});


// import React, { useEffect, useMemo, useRef, useState } from 'react'
// import { Pressable, View } from 'react-native'

// export default ({ onValueChanged }) => {

//     const thumbpadRef = useRef()

//     const [ dragging, setDragging ] = useState(false)
//     const [ value, setValue ] = useState(0.5)

//     const position = useMemo(() => {
//         if (thumbpadRef && thumbpadRef.current) {
//             const max = thumbpadRef.current.offsetParent.clientWidth - 40
//             const newPosition = max * value
//             console.log('newPosition', newPosition)
//             return newPosition
//         }
//         return null
//     }, [value])

//     const onChange = event => {
//         console.log('onChange:event', event)
//         const maxWidth = event.target.offsetParent.clientWidth - 40
//         setValue(value)
//     }
    
//     // useEffect(() => {
//     //     // Everything around if statement
//     //     if (thumbpadRef && thumbpadRef.current) {
//     //         console.log('thumbpadRef', thumbpadRef.current)
//     //         thumbpadRef.current.addEventListener('drag', onChange)
        
//     //       return () => {
//     //         thumbpadRef.current.removeEventListener('drag', onChange)
//     //       }
//     //     }
//     //   }, [thumbpadRef])

//     // const updatePosition = pos => {
//     //     console.log('pos', pos)
//     //     if (pos >= 0 && pos <= thumbRef.current.offsetParent.clientWidth - 40) {
//     //         setPosition(pos)
//     //     }
//     // }

//     return (
//         <View
//             style={{
//                 // flex: 1,
//                 width: '100%',
//                 height: 40,
//                 position: 'relative',
//                 borderWidth: 1,
//             }}
//         >
//             <Pressable
//                 ref={thumbpadRef}
//                 onTouchMove={onChange}
//                 onTouchStart={() => setDragging(true)}
//                 onTouchEnd={() => setDragging(false)}
//                 style={{
//                     position: 'absolute',
//                     top: 0,
//                     left: position,
//                     height: 40,
//                     width: 40,
//                     borderRadius: 20,
//                     backgroundColor: 'tomato',
//                 }}
//             />
//         </View>
//     )
// }