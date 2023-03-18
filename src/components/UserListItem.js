import React from 'react'
import {
    StyleSheet,
    Text,
    TouchableOpacity,
} from 'react-native'
import { Profile } from './'
import { RightOutlined } from '@ant-design/icons'

const UserListItem = ({ setUser, user }) => (
  <TouchableOpacity
    style={styles.rowContainer}
    onPress={() => setUser(user._id)}
>
    <Profile
      user={user}
      style={styles.profile}
    />
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
  profile: {
    flex: 1,
    flexGrow: 0,
    flexShrink: 0,
    flexBasis: 'auto',
    marginRight: 10,
  },
})