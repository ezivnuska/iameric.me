import React, { useEffect, useState } from 'react'
import { View } from 'react-native'
import { Button, Icon, Text } from 'react-native-paper'
import { Row, Stack } from '@components'
import Animated, { interpolate, useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated'
import { Size } from '@utils/stack'

const Job = ({ section, onPress, visible = false, ...props }) => {
    const { company, city, start, end } = section

    const [containerHeight, setContainerHeight] = useState(null)
    const [backgroundColor, setBackgroundColor] = useState('tomato')

    const time = start === end ? start : `${start}-${end.substring(2)}`

    const anim = useSharedValue(0)

    const animatedStyle = useAnimatedStyle(() => ({
        height: interpolate(anim.value, [0, 1], [0, containerHeight || 300]),
        opacity: interpolate(anim.value, [0, 1], [0, 1]),
    }))
    
    useEffect(() => {
        setBackgroundColor(visible ? withTiming('black') : withTiming('tomato'))
        anim.value = withTiming(visible ? 1 : 0, { duration: 250 })
    }, [visible])

    const onLayout = e => setContainerHeight(e.nativeEvent.layout.height)

    return (
        <Stack
            key={`job-${props.key}`}
            padding={[Size.None, Size.S]}
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
                    fontSize: 20,
                    paddingVertical: Size.XS,
                    marginHorizontal: Size.M,
                }}
            >
                {company}
            </Button>
            
            <Animated.View style={animatedStyle}>
                
                <View
                    onLayout={onLayout}
                >
                    <Stack
                        padding={[Size.S, Size.M]}
                        spacing={10}
                    >
                        <Row
                            align='center'
                            spacing={10}
                        >
                            <Text variant='titleMedium'>{time}</Text>

                            <Text variant='titleMedium'>{city}</Text>
                        </Row>
                    
                        {section.bullets.map(text => (
                            <Row key={props.key} spacing={5}>
                                
                                <Icon
                                    source={'chevron-right'}
                                    size={18}
                                    allowFontScaling={true}
                                    style={{ fontWeight: 700 }}
                                />
                                <View style={{ flex: 1 }}>
                                    <Text variant='bodyMedium'>{text}</Text>
                                </View>
                                
                            </Row>
                        ))}

                    </Stack>

                </View>

            </Animated.View>

        </Stack>
    )
}

export default Job