import React, { useEffect, useMemo, useState } from 'react'
import { View } from 'react-native'
import { IconButton } from 'react-native-paper'
import { useBonds, useNotification, useUser, useSocket } from '@context'
import isEqual from '@utils/isEqual'
import { addBond, cancelBond, confirmBond, declineBond, deleteBond } from '@utils/bonds'

const BondIndicator = ({ userId }) => {
    
    const { getBond, removeBond, updateBond } = useBonds()
    const { socket, getConnectionId, notifySocket } = useSocket()
    const { addNotification } = useNotification()
    const { user } = useUser()

    const [bond, setBond] = useState(null)
    const [prevBond, setPrevBond] = useState(null)
    const [loading, setLoading] = useState(false)

    const status = useMemo(() => {
        if (!bond) return null
        else if (bond.confirmed) return 'confirmed'
        else if (bond.declined) return 'declined'
        else if (bond.cancelled) return 'cancelled'
        else if (bond.responder === user._id) return 'pending'
        else if (bond.sender === user._id) return 'waiting'
    }, [bond])

    useEffect(() => {

        socket.on('updated_bond', updatedBond => {
            
            if (updatedBond) {

                const isBond = updatedBond.sender === userId || updatedBond.responder === userId

                if (isBond) {
                    
                    let notification

                    if (updatedBond.declined) notification = 'request declined'
                    else if (updatedBond.cancelled) notification = 'request cancelled'
                    else if (updatedBond.confirmed) notification = 'request accepted'
                    else notification = 'connection requested'

                    if (notification) addNotification(notification)
                    
                    if (updatedBond.declined || updatedBond.cancelled) {
                        setBond(null)
                        removeBond(updatedBond._id)
                    } else {
                        setBond(updatedBond)
                        updateBond(updatedBond)
                    }
        
                }
            }
        })
    }, [])

    useEffect(() => {
        loadBond()
    }, [userId])

    useEffect(() => {
        
        setPrevBond(bond)
    }, [bond])

    const loadBond = async () => {
        setLoading(true)
        const response = getBond(userId)
        setLoading(false)
        
        setBond(response)
    }

    const handleDelete = async () => {
        setLoading(true)
        const deletedBond = await deleteBond(bond._id)
        setLoading(false)
        if (deletedBond) {
            removeBond(deletedBond._id)
        }
    }

    const handleCancel = async () => {
        setLoading(true)
        const cancelledBond = await cancelBond(bond._id, user._id)
        setLoading(false)
        if (cancelledBond) {
            const connection = getConnectionId(user._id === cancelledBond.sender ? cancelledBond.responder : cancelledBond.sender)
            if (connection) {
                const { socketId } = connection
                notifySocket('bond_updated', {
                    bond: cancelledBond,
                    socketId,
                })
            }
            setBond(null)
            handleDelete()
        }
    }

    const handleConnect = async () => {
        setLoading(true)
        const newBond = await addBond(userId, user._id)
        setLoading(false)
        if (newBond) {
            const connection = getConnectionId(user._id === newBond.sender ? newBond.responder : newBond.sender)
            if (connection) {
                const { socketId } = connection
                notifySocket('bond_updated', {
                    bond: newBond,
                    socketId,
                })
            }
            setBond(newBond)
            updateBond(newBond)
        }
    }

    const handleDisconnect = async () => {
        setLoading(true)
        const disconnectedBond = await cancelBond(bond._id, user._id)
        setLoading(false)
        if (disconnectedBond) {
            const connection = getConnectionId(user._id === disconnectedBond.sender ? disconnectedBond.responder : disconnectedBond.sender)
            if (connection) {
                const { socketId } = connection
                notifySocket('bond_updated', {
                    bond: disconnectedBond,
                    socketId,
                })
            }
            setBond(null)
            handleDelete()
        }
    }

    const handleAccept = async () => {
        setLoading(true)
        const confirmedBond = await confirmBond(bond._id, user._id)
        setLoading(false)
        if (confirmedBond) {
            const connection = getConnectionId(user._id === confirmedBond.sender ? confirmedBond.responder : confirmedBond.sender)
            if (connection) {
                const { socketId } = connection
                notifySocket('bond_updated', {
                    bond: confirmedBond,
                    socketId,
                })
            }
            setBond(confirmedBond)
            updateBond(confirmedBond)
        }
    }

    const handleDecline = async () => {
        setLoading(true)
        const declinedBond = await declineBond(bond._id, user._id)
        setLoading(false)
        if (declinedBond) {
            const connection = getConnectionId(user._id === declinedBond.sender ? declinedBond.responder : declinedBond.sender)
            if (connection) {
                const { socketId } = connection
                notifySocket('bond_updated', {
                    bond: declinedBond,
                    socketId,
                })
            }
            setBond(null)
            handleDelete()
        }
    }

    const renderOptions = () => {
        switch (status) {
            case 'confirmed': return <ConfirmedOptions disconnect={handleDisconnect} />; break
            case 'pending': return <PendingOptions accept={handleAccept} decline={handleDecline} />; break
            case 'waiting': return <WaitingOptions cancel={handleCancel} />; break
            default: return <DefaultOptions connect={handleConnect} />
        }
    }

    return (
        <View style={{ flexDirection: 'row' }}>
            {renderOptions()}
        </View>
    )
}

export default BondIndicator


const PendingOptions = ({ accept, decline }) => (
    <View
        style={{
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
        }}
    >

        <IconButton
            icon='check-circle'
            onPress={accept}
            iconColor='green'
            style={{ margin: 0 }}
        />

        <IconButton
            icon='close-circle'
            onPress={decline}
            iconColor='red'
            style={{ margin: 0 }}
        />

    </View>
)

const DefaultOptions = ({ connect }) => (
    <View
        style={{
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
            gap: 10,
        }}
    >
        <IconButton
            icon='account-plus'
            onPress={connect}
            style={{ margin: 0 }}
        />

    </View>
)

const WaitingOptions = ({ cancel }) => (
    <View
        style={{
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
            gap: 10,
        }}
    >
        <IconButton
            icon='close-circle'
            onPress={cancel}
            iconColor='red'
            style={{ margin: 0 }}
        />

    </View>
)

const ConfirmedOptions = ({ disconnect }) => (
    <View
        style={{
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
            gap: 10,
        }}
    >
        <IconButton
            icon='account-remove'
            onPress={disconnect}
            iconColor='red'
            style={{ margin: 0 }}
        />

    </View>
)