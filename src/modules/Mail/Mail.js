import React, { useEffect, useMemo, useState } from 'react'
import { View } from 'react-native'
import { ThemedText } from '@components'
import {
    MailHeader,
    MessageList,
} from './components'
import { useUser } from '@user'
import { useMail } from '@mail'
import { useModal } from '@modal'
import { useSocket } from '@socket'
import { deleteMessageWithId } from '@utils/mail'

export default () => {

    const { user } = useUser()

    const {
        addMessage,
        messages,
        deleteMessage,
        setMailLoading,
    } = useMail()

    const { closeModal } = useModal()

    const { socket, notifySocket } = useSocket()

    const [messageType, setMessageType] = useState('in')

    useEffect(() => {
        socket.on('new_message', message => addMessage(message))
        socket.on('deleted_message', message => deleteMessage(message))
    }, [])

    const messagesOut = useMemo(() => messages.filter(m => {
        return m.from && m.from._id === user._id
    }), [messages, user])
    const messagesIn = useMemo(() => messages.filter(m => m.to && m.to._id === user._id), [messages, user])
    const selectedMessages = useMemo(() => {
        return messageType === 'all'
            ? messages
            : messageType === 'in'
                ? messagesIn
                : messagesOut
            }, [messages, messageType, messagesIn, messagesOut])


    const removeMessage = async message => {
        setMailLoading(true)
        await deleteMessageWithId(message._id)
        setMailLoading(false)
        notifySocket('message_deleted', message)
        deleteMessage(message)
        closeModal()
    }
    
    return (
        <View style={{ flex: 1 }}>

            <MailHeader
                type={messageType}
                onChange={value => setMessageType(value)}
            />

            {!messages.length
                ? <ThemedText>Mailbox empty.</ThemedText>
                : selectedMessages.length
                    ? (
                        <MessageList
                            messages={selectedMessages}
                            onDelete={removeMessage}
                        />
                    )
                    : <ThemedText>{`No ${messageType === 'in' ? 'incoming' : 'sent'} messages.`}</ThemedText>
            }

        </View>
    )
}