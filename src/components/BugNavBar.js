import React from 'react'
import { Appbar } from 'react-native-paper'
import { useModal } from '@context'
import { navigate } from '@utils/navigation'

const BugNavBar = () => {

    const { setModal } = useModal()

    return (
        <Appbar.Header>
            <Appbar.BackAction onPress={() => navigate('Home')} />
            <Appbar.Content title='Bugs' />
            <Appbar.Action icon="bug" onPress={() => setModal('BUG')} />
        </Appbar.Header>
    )
}

export default BugNavBar