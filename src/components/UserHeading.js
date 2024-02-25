import React, { useEffect, useState } from 'react'
import {
    Image,
    Pressable,
    Text,
    View,
} from 'react-native'
import { ThunderboltOutlined } from '@ant-design/icons'
import classes from '../styles/classes'
import { useTheme } from 'react-native-paper'

const IMAGE_PATH = __DEV__ ? 'https://iameric.me/assets' : '/assets'

export default ({ children, user, filename, onPress = null, ...props }) => {

    const theme = useTheme()

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
                gap: 12,
                ...props.style,
            }}
        >
            <Image
                style={{
                    flexBasis: 'auto',
                    flexGrow: 0,
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
                    flexBasis: 'auto',
                    flexGrow: 1,
                    justifyContent: 'center',
                    flexWrap: 'wrap',
                }}
            >
                <Pressable
                    disabled={!onPress}
                    onPress={onPress}
                    // style={{ marginBottom: 8 }}
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
                
                {children}

            </View>

        </View>
    )
}