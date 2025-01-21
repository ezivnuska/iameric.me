import React from 'react'
import { Pressable, Text, View } from 'react-native'
import { UserAvatar } from '@components'
import { useTheme } from '@context'
import { navigate } from '@utils/navigation'

const Brand = ({ user, disabled }) => {

    const { styles } = useTheme()
    
    return (
        <View>
    
            {user ? (
                <View
                    style={{
                        flexDirection: 'row',
                        justifyContent: 'flex-start',
                        alignItems: 'center',
                        gap: 3,
                    }}
                >
                    <Pressable onPress={() => navigate('Home')}>
                        <Text style={styles.brand}>
                            iam
                        </Text>
                    </Pressable>
    
                    <Pressable
                        onPress={() => navigate('User', { screen: 'Profile', params: { username: user.username } })}
                        style={[styles.flexRow, { gap: 15 }]}
                    >
                        <Text style={styles.brandAlt}>
                            {user.username}
                        </Text>
                        
                        <UserAvatar
                            user={user}
                            size={36}
                        />
    
                    </Pressable>
                    
                </View>
            ) : (
                <Pressable
                    onPress={() => navigate('Home')}
                    style={[styles.flexRow, { gap: 3 }]}
                    disabled={disabled}
                >
                    <Text style={styles.brand}>
                        iameric
                    </Text>
    
                </Pressable>
            )}
        </View>
    )
}

export default Brand