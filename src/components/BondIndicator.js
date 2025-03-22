import React, { useEffect, useState } from 'react'
import { View } from 'react-native'
import { Button } from 'react-native-paper'
import { useUser } from '@context'
import { addBond, cancelBond, confirmBond, getBond, removeBond } from '@utils/bonds'

const BondIndicator = ({ userId }) => {
    
    const { user } = useUser()

    const [bond, setBond] = useState(null)
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        loadBond()
    }, [])

    useEffect(() => {
        if (bond) console.log('bond', bond)
    }, [bond])

    const loadBond = async () => {
        setLoading(true)
        const response = await getBond(userId, user._id)
        setLoading(false)
        if (response) setBond(response)
    }

    const handleCancel = async () => {
        setLoading(true)
        const newBond = await cancelBond(bond._id, user._id)
        setLoading(false)
        if (newBond) setBond(newBond)
    }

    const handleConnect = async () => {
        setLoading(true)
        const newBond = await addBond(userId, user._id)
        setLoading(false)
        if (newBond) setBond(newBond)
    }

    const handleDisconnect = async () => {
        setLoading(true)
        const updatedBond = await removeBond(bond._id, user._id)
        setLoading(false)
        if (updatedBond) setBond(updatedBond)
    }

    const handleAccept = async () => {
        setLoading(true)
        const updatedBond = await confirmBond(bond._id, user._id)
        setLoading(false)
        if (updatedBond) setBond(updatedBond)
    }

    const handleDecline = async () => {
        setLoading(true)
        const updatedBond = await declineBond(bond._id, user._id)
        setLoading(false)
        if (updatedBond) setBond(updatedBond)
    }

    const renderOptions = () => {
        if (!bond) return <ConnectButton connect={handleConnect} />
        else if (bond.confirmed) return <DisconnectButton disconnect={handleDisconnect} />
        else {
            if (bond.responder === user._id) return <PendingResponses accept={handleAccept} decline={handleDecline} />
            else if (bond.sender === user._id) return <CancelButton cancel={handleCancel} />
        }
    }

    return bond && (
        <View>
            {renderOptions()}
        </View>
    )
}

export default BondIndicator

const ConnectButton = ({ connect }) => {
    return (
        <Button
            mode='contained'
            onPress={connect}
        >
            Connect
        </Button>
    )
}

const DisconnectButton = ({ disconnect }) => {
    return (
        <Button
            mode='contained'
            onPress={disconnect}
        >
            Disconnect
        </Button>
    )
}

const CancelButton = ({ cancel }) => {
    return (
        <Button
            mode='contained'
            onPress={cancel}
        >
            Cancel
        </Button>
    )
}

const PendingResponses = ({ bond, accept, decline }) => {
    return (
        <View>

            <Button
                mode='contained'
                onPress={accept}
            >
                Accept
            </Button>

            <Button
                mode='contained'
                onPress={decline}
            >
                Decline
            </Button>

        </View>
    )
}