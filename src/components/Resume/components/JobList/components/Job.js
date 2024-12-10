import React, { useEffect, useState } from 'react'
import { Pressable, View } from 'react-native'
import { DefaultText } from '@components'
import { TextCopy } from '@components'
import { useApp } from '@context'
import Icon from 'react-native-vector-icons/Ionicons'
import Animated, {
    interpolate,
	useAnimatedStyle,
	useSharedValue,
	withTiming,
} from 'react-native-reanimated'

const Company = ({ name, open }) => (
    <View>
        <TextCopy size={18} color='#fff' bold>{name}</TextCopy>
        {/* <DefaultText bold size={18} color='#fff'>{name}</DefaultText> */}
    </View>
)

const Title = ({ title }) => (
    <View>
        <DefaultText color='tomato' size={18}>{title}</DefaultText>
    </View>
)

const City = ({ city }) => (
    <View>
        <TextCopy size={18} color='#777'>{city}</TextCopy>
    </View>
)

const Time = ({ start, end }) => {
    const string = start === end ? start : `${start}-${end.substring(2)}`
    return (
        <View>
            <DefaultText size={18} color='#777'>{string}</DefaultText>
        </View>
    )
}

const BulletListItem = ({ text, ...props }) => (
    <View
        key={props.key}
        style={{
            flexDirection: 'row',
            gap: 5,
            flexShrink: 1,
        }}
    >

        <View style={{ flexGrow: 0, marginTop: 5 }}>
            <Icon
                name={'chevron-forward'}
                size={16}
                color='tomato'
            />
        </View>

        <View style={{ flexShrink: 1 }}>
            <TextCopy>{text}</TextCopy>
        </View>
    </View>
)

const BulletedList = ({ items, listKey }) => (
    <View
        style={{
            gap: 7,
            marginHorizontal: 7,
            marginBottom: 10,
            marginTop: 2,
        }}
    >
        {items.map((text, index) => (
            <BulletListItem
                text={text}
                key={`${listKey}-${index}`}
            />
        ))}
    </View>
)

const Job = ({ section, onPress, visible = false, ...props }) => {
    const { company, city, start, end, title } = section
    
    const { theme } = useApp()

    const [containerHeight, setContainerHeight] = useState(null)
    const [backgroundColor, setBackgroundColor] = useState('tomato')

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
                    paddingHorizontal: 7,
                    paddingVertical: 3,
                    marginBottom: 5,
                }, backgroundColorAnim]}
            >
                <View
                    style={{
                        flexGrow: 1,
                        flexDirection: 'row',
                        alignContent: 'center',
                        gap: 10,
                    }}
                >
                    <Company name={company} />
                    {/* <Title title={title} /> */}
                </View>

                <View style={{ flexGrow: 0 }}>
                    <Icon
                        name={visible ? 'chevron-up' : 'chevron-down'}
                        size={18}
                        color='#fff'
                    />
                </View>
            </Animated.View>
            
            <Animated.View style={animatedStyle}>
                <View onLayout={onLayout}>
                    <View
                        style={{
                            flexDirection: 'row',
                            alignContent: 'center',
                            gap: 10,
                            paddingHorizontal: 7,
                        }}
                    >
                        <Time start={start} end={end} />
                        <City city={city} />
                    </View>

                    <BulletedList items={section.bullets} listKey={props.key} />
                </View>

            </Animated.View>

        </Pressable>
    )
}

export default Job