import React, { useEffect, useMemo, useState } from 'react'
import { View } from 'react-native'
import { ThemedText } from '@components'
import { MessageList } from './components'
import { useApp } from '@app'
import { useMail } from '@mail'
import { useModal } from '@modal'
import { useSocket } from '@socket'
import { deleteMessageWithId } from '@utils/mail'
import { Pressable } from 'react-native'

export default () => {

    const { user } = useApp()

    const {
        addMessage,
        messages,
        deleteMessage,
        setMailLoading,
    } = useMail()

    const { closeModal } = useModal()

    const { socket } = useSocket()

    const [messageType, setMessageType] = useState('all')

    useEffect(() => {
        socket.on('new_message', message => addMessage(message))
        socket.on('deleted_message', message => deleteMessage(message))
    }, [])

    const messagesOut = useMemo(() => messages.filter(m => m.from._id === user._id), [messages, user])
    const messagesIn = useMemo(() => messages.filter(m => m.to._id === user._id), [messages, user])
    const selectedMessages = useMemo(() => {
        return messageType === 'all'
            ? messages
            : messageType === 'in'
                ? messagesIn
                : messagesOut
            }, [messages, messageType, messagesIn, messagesOut])

    const renderSwitch = () => {
        return (
            <View
                style={{
                    flexDirection: 'row',
                    justifyContent: 'space-evenly',
                    borderRadius: 6,
                    background: '#ccc',
                }}
            >

                <Pressable
                    onPress={() => setMessageType('in')}
                    disabled={messageType === 'in'}
                    style={{
                        flex: 1,
                        background: messageType === 'in' ? 'tomato' : 'transparent',
                        borderTopLeftRadius: 6,
                        borderBottomLeftRadius: 6,
                    }}
                >
                    <ThemedText
                        bold={messageType === 'out'}
                        style={{
                            textAlign: 'center',
                            lineHeight: 30,
                        }}
                    >
                        In
                    </ThemedText>
                </Pressable>

                <Pressable
                    onPress={() => setMessageType('all')}
                    disabled={messageType === 'all'}
                    style={{
                        flex: 1,
                        background: messageType === 'all' ? 'tomato' : 'transparent',
                    }}
                >
                    <ThemedText
                        bold={messageType === 'all'}
                        style={{
                            textAlign: 'center',
                            lineHeight: 30,
                        }}
                    >
                        All
                    </ThemedText>

                </Pressable>

                <Pressable
                    onPress={() => setMessageType('out')}
                    disabled={messageType === 'out'}
                    style={{
                        flex: 1,
                        background: messageType === 'out' ? 'tomato' : 'transparent',
                        borderTopRightRadius: 6,
                        borderBottomRightRadius: 6,
                    }}
                >
                    
                    <ThemedText
                        bold={messageType === 'out'}
                        style={{
                            textAlign: 'center',
                            lineHeight: 30,
                        }}
                    >
                        Out
                    </ThemedText>

                </Pressable>
            </View>
        )
    }

    const removeMessage = async message => {
        setMailLoading(true)
        await deleteMessageWithId(message._id)
        setMailLoading(false)
        
        socket.emit('message_deleted', message)
        deleteMessage(message)
        closeModal()
    }
    
    return (
        <View style={{ gap: 10, flexGrow: 1 }}>

            {
                !messages.length
                ? <ThemedText>Mailbox empty.</ThemedText>
                : (
                    <>
                        {renderSwitch()}
                        {
                            selectedMessages.length
                                ? <MessageList messages={selectedMessages} onDelete={removeMessage} />
                                : (
                                    <ThemedText>
                                        {`No ${messageType === 'in' ? 'incoming' : 'sent'} messages.`}
                                    </ThemedText>
                                )
                        }
                    </>
                )
            }

        </View>
    )
}