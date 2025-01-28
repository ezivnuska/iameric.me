import React from 'react'
import { Appbar } from 'react-native-paper'
import { useBugs } from '@context'
import { navigate } from '@utils/navigation'

const BugNavBar = () => {

    const { setBugModal } = useBugs()

    return (
        <Appbar.Header>
            <Appbar.BackAction onPress={() => navigate('Home')} />
            <Appbar.Content title='Bugs' />
            <Appbar.Action icon="bug" onPress={() => setBugModal('BUG')} />
        </Appbar.Header>
    )
}

export default BugNavBar