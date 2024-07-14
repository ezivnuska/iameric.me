import React, { useEffect, useMemo, useState } from 'react'
import { View } from 'react-native'
import { ThemedText } from '@components'
import {
    MailNav,
    MessageList,
} from './components'
import { useApp } from '@app'
import { useMail } from '@mail'
import { useModal } from '@modal'
import { useSocket } from '@socket'
import { deleteMessageWithId } from '@utils/mail'

export default () => {

    const { user } = useApp()

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

    const messagesOut = useMemo(() => messages.filter(m => m.from._id === user._id), [messages, user])
    const messagesIn = useMemo(() => messages.filter(m => m.to._id === user._id), [messages, user])
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
        <View style={{ gap: 10, flexGrow: 1 }}>

            {
                !messages.length
                ? <ThemedText>Mailbox empty.</ThemedText>
                : (
                    <>
                        <MailNav type={messageType} onChange={value => setMessageType(value)} />
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