import React from 'react'
import {
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native'
import { Profile, UserDetails } from './'
import { RightOutlined } from '@ant-design/icons'

const UserListItem = ({ clearUser, setUser, user }) => (
  <TouchableOpacity
    style={styles.rowContainer}
    onPress={() => setUser(user._id)}
  >
    <View style={styles.profile}>
      <UserDetails
        user={user}
        clearUser={clearUser}
      />
    </View>
    <View style={styles.arrow}>
      <RightOutlined />
    </View>
  </TouchableOpacity>
)

export default UserListItem

const styles = StyleSheet.create({
  rowContainer: {
    flex: 1,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    // marginBottom: 10,
    paddingTop: 12,
    borderStyle: 'solid',
    borderBottomWidth: 1,
    borderBottomColor: '#aaa',
  },
  profile: {
    flex: 1,
    flexGrow: 0,
    flexShrink: 0,
    flexBasis: 'auto',
    marginRight: 10,
  },
  arrow: {
    flex: 1,
    flexGrow: 0,
    flexBasis: 'auto',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
  },
})