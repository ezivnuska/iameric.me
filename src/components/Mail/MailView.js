import React, { useEffect } from 'react'
import { View } from 'react-native'
import { MessageList } from './components'
import { useMail } from '@mail'
import { useModal } from '@modal'
import { useSocket } from '@socket'
import { deleteMessageWithId } from '@utils/mail'

export default () => {

    const { socket } = useSocket()

    const {
        addMessage,
        messages,
        deleteMessage,
        setMailLoading,
    } = useMail()

    const {
        closeModal,
    } = useModal()

    useEffect(() => {
        // socket.on('new_message', addMessage)
        socket.on('deleted_message', deleteMessage)
    }, [])

    const removeMessage = async id => {
        setMailLoading(true)
        await deleteMessageWithId(id)
        setMailLoading(false)
        socket.emit('message_deleted', id)
        deleteMessage(id)
        closeModal()
    }
    
    return (
        <View
            style={{ gap: 10 }}
        >

            <MessageList
                messages={messages}
                onDelete={removeMessage}
            />

        </View>
    )
}