import React from 'react'
import {
    StyleSheet,
    Text,
    TouchableOpacity,
} from 'react-native'
import { Avatar } from './'
import { RightOutlined } from '@ant-design/icons'

const UserListItem = ({ setUser, user }) => (
  <TouchableOpacity
    style={styles.rowContainer}
    onPress={() => setUser(user._id)}
>
    <Avatar
      user={user}
      size={22}
      style={styles.avatar}
    />
    <Text style={[styles.userDetails, styles.username]}>{user.username}</Text>
    <RightOutlined />
  </TouchableOpacity>
)

export default UserListItem

const styles = StyleSheet.create({
  rowContainer: {
    flex: 1,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    // marginBottom: 10,
    paddingVertical: 12,
    paddingHorizontal: 0,
    borderStyle: 'solid',
    borderBottomWidth: 1,
    borderBottomColor: '#aaa',
  },
  userDetails: {
    flex: 1,
    flexGrow: 1,
    // marginBottom: 10,
    // justifyContent: 'space-between',
  },
  username: {
    lineHeight: 22,
  },
  avatar: {
    flex: 1,
    flexGrow: 0,
    flexShrink: 0,
    flexBasis: 'auto',
    marginRight: 10,
  },
  right: {
    flex: 1,
    flexGrow: 0,
    width: 'auto',
    flexDirection: 'column',
    justifyContent: 'center',
  },
})