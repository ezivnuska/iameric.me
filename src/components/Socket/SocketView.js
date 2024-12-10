import React from 'react'
import { View } from 'react-native'
import { DefaultText } from '@components'
import { useApp } from '@context'

const SocketView = ({ connected, connections, username }) => {

    const renderHeading = () => (
        <View
            style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                paddingBottom: 10,
                paddingHorizontal: 5,
                gap: 10,
            }}
        >
            <View
                style={{
                    flexGrow: 1,
                    flexShrink: 0,
                }}
            >
                <DefaultText size={16}>
                    {`${connections.length || 'No'} connection${connections.length !== 1 ? `s` : ''}`}
                </DefaultText>
            </View>

            <View
                style={{
                    flexGrow: 0,
                    textAlign: 'right',
                }}
            >
                <DefaultText>
                    {`Connected as ${username}`}
                </DefaultText>
            </View>
        </View>
    )

    return (
        <View style={{ flex: 1 }}>

            {renderHeading()}

            <View
                style={{
                    paddingHorizontal: 12,
                    paddingVertical: 10,
                    borderRadius: 10,
                    borderWidth: 1,
                    borderColor: '#000',
                }}
            >

                <View
                    style={{
                        gap: 7,
                        flexGrow: 1,
                        // paddingBottom: 20,
                    }}
                >
                    {connections.map((conn, key) => (
                        <View
                            key={key}
                            style={{
                                flexDirection: 'row',
                                justifyContent: 'space-between',
                                gap: 10,
                            }}
                        >
                            <DefaultText
                                color={connected ? 'tomato' : theme?.colors.textDefault}
                                bold={connected ? true : false}
                                size={16}
                            >
                                {conn?.username || username}
                            </DefaultText>
                        </View>
                    ))}
                </View>
            </View>
        </View>
    )
}

export default SocketView