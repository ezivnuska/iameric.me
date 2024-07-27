import React from 'react'
import {
    Pressable,
    View,
} from 'react-native'
import { ThemedText } from '@components'
import { useApp } from '@app'
import Icon from 'react-native-vector-icons/Ionicons'

const Company = ({ name }) => (
    <View>
        <ThemedText bold size={18}>{name}</ThemedText>
    </View>
)

const Title = ({ title }) => (
    <View>
        <ThemedText color='tomato' size={18}>{title}</ThemedText>
    </View>
)

const City = ({ city }) => (
    <View>
        <ThemedText size={18} color='#777'>{city}</ThemedText>
    </View>
)

const Time = ({ start, end }) => {
    const string = start === end ? start : `${start}-${end.substring(2)}`
    return (
        <View>
            <ThemedText size={18} color='#777'>{string}</ThemedText>
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
            <ThemedText>{text}</ThemedText>
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

export default ({ section, onPress, visible = false, ...props }) => {
    const { company, city, start, end, title } = section
    
    const { theme } = useApp()
    return (
        <Pressable
            onPress={onPress}
            key={`job-${props.key}`}
        >
            <View
                style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    gap: 10,
                    background: '#eee',
                    borderRadius: 6,
                    paddingHorizontal: 7,
                    paddingVertical: 3,
                    marginBottom: 5,
                }}
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
                        color={theme?.colors.textDefault}
                    />
                </View>
            </View>
            
            {visible && (
                <>
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
                </>
            )}
        </Pressable>
    )
}