import React, { useContext, useEffect, useState } from 'react'
import {
    Image,
    Pressable,
    Text,
    View,
} from 'react-native'
import { ThunderboltOutlined } from '@ant-design/icons'
import classes from '../styles/classes'
import { useTheme } from 'react-native-paper'
import { AppContext } from '../AppContext'

const IMAGE_PATH = __DEV__ ? 'https://iameric.me/assets' : '/assets'

export default ({ children, user, filename, onPress = null }) => {

    const theme = useTheme()

    const {
        loading,
    } = useContext(AppContext)

    const [online, setOnline] = useState(false)

    useEffect(() => {
        if (user && user.exp) {
            const newDate = new Date(user.exp) - Date.now()
            const expired = (newDate > 0)
            setOnline(!expired)
        }
    }, [user])
    
    const getSource = () => filename
        ? `${IMAGE_PATH}/${user.username}/${filename}`
        : `${IMAGE_PATH}/avatar-default-small.png`

    return (
        <View
            style={{
                flex: 1,
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'flex-start',
                alignItems: 'flex-start',
            }}
        >
            <Image
                style={{
                    flexBasis: 'auto',
                    marginRight: 10,
                    width: 32,
                    height: 32,
                    resizeMode: 'stretch',
                }}
                // onLoadStart={() => setLoading(true)}
                // onLoadEnd={() => setLoading(false)}
                source={getSource()}
            />
            
            <View
                style={{
                    flex: 1,
                    justifyContent: 'center',
                    flexWrap: 'wrap',
                }}
            >
                <Pressable
                    disabled={!onPress}
                    onPress={onPress}
                >
                    <Text
                        style={[
                            classes.userHeading,
                            { color: theme?.colors.textDefault }
                        ]}
                    >
                        {user.username}
                        {online && <ThunderboltOutlined style={{ marginLeft: 10, color: 'green' }} />}
                    </Text>

                </Pressable>
                
                {children ? <View>{children}</View> : null}
            </View>

        </View>
    )
}