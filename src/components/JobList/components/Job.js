import React, { useEffect, useState } from 'react'
import { Pressable, Text, View } from 'react-native'
import { useApp } from '@context'
import { useStyles } from '@styles'
import Icon from 'react-native-vector-icons/Ionicons'
import Animated, {
    interpolate,
	useAnimatedStyle,
	useSharedValue,
	withTiming,
} from 'react-native-reanimated'


const BulletListItem = ({ text, styles, ...props }) => (
    <View
        key={props.key}
        style={styles.flexRow}
    >
        <Icon
            name={'chevron-forward'}
            size={16}
            color='tomato'
            style={{ marginTop: 3 }}
        />

        <Text style={styles.copy}>{text}</Text>
    </View>
)

const BulletedList = ({ items, listKey, styles }) => (
    
    <View style={[styles.paddedHorizontal, { gap: 10 }]}>

        {items.map((text, index) => (
            <BulletListItem
                text={text}
                styles={styles}
                key={`${listKey}-${index}`}
            />
        ))}

    </View>
)

const Job = ({ section, onPress, visible = false, ...props }) => {
    const { company, city, start, end, title } = section
    
    const { theme } = useApp()
    const styles = useStyles(theme)

    const [containerHeight, setContainerHeight] = useState(null)
    const [backgroundColor, setBackgroundColor] = useState('tomato')

    const time = start === end ? start : `${start}-${end.substring(2)}`

    const anim = useSharedValue(0)

    const animatedStyle = useAnimatedStyle(() => ({
        height: interpolate(anim.value, [0, 1], [0, containerHeight || 300]),
        opacity: interpolate(anim.value, [0, 1], [0, 1]),
    }))

    const backgroundColorAnim = useAnimatedStyle(() => ({ backgroundColor }))
    
    useEffect(() => {
        setBackgroundColor(visible ? withTiming('black') : withTiming('tomato'))
        anim.value = withTiming(visible ? 1 : 0, { duration: 250 })
    }, [visible])

    const onLayout = e => {
        setContainerHeight(e.nativeEvent.layout.height)
    }

    return (
        <Pressable
            onPress={onPress}
            key={`job-${props.key}`}
        >
            <Animated.View
                style={[{
                    flexDirection: 'row',
                    alignItems: 'center',
                    gap: 10,
                    backgroundColor: '#eee',
                    borderRadius: 6,
                    paddingHorizontal: 10,
                    // marginBottom: 10,
                    height: 40,
                }, backgroundColorAnim]}
            >

                <View style={[styles.flexRow, styles.flexDominant]}>
                    <Text style={styles.buttonLabel}>{company}</Text>
                </View>

                <Icon
                    name={visible ? 'chevron-up' : 'chevron-down'}
                    size={24}
                    color='#fff'
                />

            </Animated.View>
            
            <Animated.View style={animatedStyle}>
                <View
                    onLayout={onLayout}
                    style={[styles.paddedVertical, { gap: 10 }]}
                >
                    <View
                        style={[
                            styles.flexRow,
                            styles.paddedHorizontal,
                        ]}
                    >
                        <Text style={styles.time}>{time}</Text>
                        <Text style={styles.city}>{city}</Text>
                    </View>

                    <BulletedList
                        listKey={props.key}
                        items={section.bullets}
                        styles={styles}
                    />

                </View>

            </Animated.View>

        </Pressable>
    )
}

export default Job