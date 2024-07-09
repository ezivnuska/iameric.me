import React, { useEffect } from 'react'
import { View } from 'react-native'
import { ThemedText } from '@components'
import { MessageList } from './components'
import { useMail } from '@mail'
import { useModal } from '@modal'
import { useSocket } from '@socket'
import { deleteMessageWithId } from '@utils/mail'

export default () => {

    const {
        addMessage,
        messages,
        deleteMessage,
        setMailLoading,
    } = useMail()

    const {
        closeModal,
    } = useModal()

    const { socket } = useSocket()

    useEffect(() => {
        socket.on('new_message', message => addMessage(message))
        socket.on('deleted_message', message => deleteMessage(message))
    }, [])

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
                messages.length
                ? <MessageList messages={messages} onDelete={removeMessage} />
                : <ThemedText>Mailbox empty.</ThemedText>
            }

        </View>
    )
}