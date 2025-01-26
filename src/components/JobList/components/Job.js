import React, { useEffect, useState } from 'react'
import { Pressable, StyleSheet, View } from 'react-native'
import { Button, Icon, Text } from 'react-native-paper'
import { useTheme } from '@context'
// import Icon from 'react-native-vector-icons/Ionicons'
import Animated, {
    interpolate,
	useAnimatedStyle,
	useSharedValue,
	withTiming,
} from 'react-native-reanimated'


const BulletListItem = ({ text, ...props }) => (
    <View
        key={props.key}
        style={{ flexDirection: 'row', gap: 5 }}
    >
        <Icon
            source={'chevron-right'}
            size={18}
            allowFontScaling={true}
            // color='tomato'
            style={{ fontWeight: 700 }}
        />

        <Text variant='bodyMedium'>
            {text}
        </Text>
        
    </View>
)

const Job = ({ section, onPress, visible = false, ...props }) => {
    const { company, city, start, end, title } = section
    
    // const { styles } = useTheme()

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
        <View
            key={`job-${props.key}`}
            style={{ marginHorizontal: 10 }}
        >
            <Button
                icon={visible ? 'chevron-up' : 'chevron-down'}
                onPress={onPress}
                mode={visible ? 'contained' : 'contained-tonal' }
                contentStyle={{
                    width: '100%',
                    flexDirection: 'row-reverse',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    gap: 10,
                }}
                labelStyle={{
                    fontSize: 25,
                    marginHorizontal: 20,
                    marginVertical: 10,
                }}
            >
                {company}
            </Button>
            
            <Animated.View style={animatedStyle}>
                <View
                    onLayout={onLayout}
                    style={{
                        paddingHorizontal: 20,
                        paddingVertical: 10,
                        gap: 10,
                     }}
                >
                    <View
                        style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                            gap: 10,
                        }}
                    >
                        <Text variant='titleMedium'>
                            {time}
                        </Text>

                        <Text variant='titleMedium'>
                            {city}
                        </Text>

                    </View>
                    
                    <View style={{ gap: 10 }}>

                        {section.bullets.map((text, index) => (
                            <BulletListItem
                                text={text}
                                key={`${props.key}-${index}`}
                            />
                        ))}

                    </View>

                </View>

            </Animated.View>

        </View>
    )
}

export default Job

const styles = StyleSheet.create({
    buttonLabel: {
        fontSize: 18,
        // color: colors.button.text,
        fontWeight: 700,
    },
    city: {
        fontSize: 18,
        lineHeight: 23,
        // color: colors.gray,
    },
})