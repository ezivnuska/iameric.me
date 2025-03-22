import React, { useEffect, useMemo, useState } from 'react'
import { View } from 'react-native'
import { Button } from 'react-native-paper'
import { useBonds, useUser, useSocket } from '@context'
import { addBond, cancelBond, confirmBond, declineBond, deleteBond } from '@utils/bonds'

const BondIndicator = ({ userId }) => {
    
    const { socket, getConnectionId, notifySocket } = useSocket()
    const { getBond, removeBond, updateBond } = useBonds()
    const { user } = useUser()

    const [bond, setBond] = useState(null)
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
                
                if (updatedBond.declined || updatedBond.cancelled) {
                    
                    removeBond(updatedBond._id)
    
                    setBond(null)
    
                } else {
                    setBond(updatedBond)
                    updateBond(updatedBond)
                }
            }
        })

        // loadBond()
    }, [])

    useEffect(() => {
        loadBond()
    }, [userId])

    useEffect(() => {
        
        if (bond) {
            if (bond.cancelled || bond.declined) {
                removeBond(bond._id)
                handleDelete()
            } else {
                updateBond(bond)
            }
        }
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
            const { socketId } = getConnectionId(user._id === deletedBond.sender ? deletedBond.responder : deletedBond.sender)
            notifySocket('bond_updated', {
                bond: deletedBond,
                socketId,
            })
            setBond(null)
        }
    }

    const handleCancel = async () => {
        setLoading(true)
        const cancelledBond = await cancelBond(bond._id, user._id)
        setLoading(false)
        if (cancelledBond) {
            const { socketId } = getConnectionId(user._id === cancelledBond.sender ? cancelledBond.responder : cancelledBond.sender)
            notifySocket('bond_updated', {
                bond: cancelledBond,
                socketId,
            })
            setBond(cancelledBond)
        }
    }

    const handleConnect = async () => {
        setLoading(true)
        const newBond = await addBond(userId, user._id)
        setLoading(false)
        if (newBond) {
            const { socketId } = getConnectionId(user._id === newBond.sender ? newBond.responder : newBond.sender)
            notifySocket('bond_updated', {
                bond: newBond,
                socketId,
            })
            setBond(newBond)
        }
    }

    const handleDisconnect = async () => {
        setLoading(true)
        const disconnectedBond = await cancelBond(bond._id, user._id)
        setLoading(false)
        if (disconnectedBond) {
            const { socketId } = getConnectionId(user._id === disconnectedBond.sender ? disconnectedBond.responder : disconnectedBond.sender)
            notifySocket('bond_updated', {
                bond: disconnectedBond,
                socketId,
            })
            setBond(disconnectedBond)
        }
    }

    const handleAccept = async () => {
        setLoading(true)
        const confirmedBond = await confirmBond(bond._id, user._id)
        setLoading(false)
        if (confirmedBond) {
            const { socketId } = getConnectionId(user._id === confirmedBond.sender ? confirmedBond.responder : confirmedBond.sender)
            notifySocket('bond_updated', {
                bond: confirmedBond,
                socketId,
            })
            setBond(confirmedBond)
        }
    }

    const handleDecline = async () => {
        setLoading(true)
        const declinedBond = await declineBond(bond._id, user._id)
        setLoading(false)
        if (declinedBond) {
            const { socketId } = getConnectionId(user._id === declinedBond.sender ? declinedBond.responder : declinedBond.sender)
            notifySocket('bond_updated', {
                bond: declinedBond,
                socketId,
            })
            setBond(declinedBond)
        }
    }

    const renderOptions = () => {
        switch (status) {
            case 'confirmed': return <ResponseButton label='Disconnect' loading={loading} onPress={handleDisconnect} />; break
            case 'pending': return (
                <View style={{ flexDirection: 'row', gap: 10 }}>
                        <ResponseButton label='Accept' loading={loading} onPress={handleAccept} />
                        <ResponseButton label='Decline' loading={loading} onPress={handleDecline} />
                    </View>
                )
                break
            case 'waiting': return <ResponseButton label='Cancel' loading={loading} onPress={handleCancel} />; break
            case 'none': 
            case 'declined':
            case 'cancelled':
            default: return <ResponseButton label='Connect' loading={loading} onPress={handleConnect} />
        }
    }

    return (
        <View style={{ flexDirection: 'row' }}>
            {renderOptions()}
        </View>
    )
}

export default BondIndicator

const ResponseButton = ({ label, loading, onPress }) => (
    <Button
        mode='contained'
        onPress={onPress}
        disabled={loading}
    >
        {label}
    </Button>
)