import React from 'react'
import {
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native'
import { Button } from 'antd'

const numDurations = 6

const TimeButton = ({ time, onSelect }) => {
    return (
        <Button
            type='primary'
            size='small'
            onClick={() => onSelect(time)}
        >
            {`${time} minutes`}
        </Button>
    )
}

const TimeSelector = ({ onSelect }) => {

    const renderButtons = () => {
        const array = []
        let time = numDurations
        while (time > 0) {
            array.push(
                <TimeButton
                    key={time}
                    time={time * 5}
                    onSelect={t => onSelect(t)}
                />
            )
            time--
        }
        return array
    }

    return (
        <View style={styles.container}>
            {renderButtons()}
        </View>
    )
}

export default TimeSelector

const styles = StyleSheet.create({
    container: {

    },
})