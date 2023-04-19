import React from 'react'
import {
    StyleSheet,
    Text,
    TouchableOpacity,
} from 'react-native'

const ActivityListItem = ({ activity }) => (
  <TouchableOpacity
    style={styles.container}
    onPress={() => console.log('activity pressed')}
>
    <Text style={styles.text}>{activity}</Text>
  </TouchableOpacity>
)

export default ActivityListItem

const styles = StyleSheet.create({
  container: {
  },
  text: {
    paddingHorizontal: '0.75rem',
    lineHeight: 30,
    color: 'red',
  },
})