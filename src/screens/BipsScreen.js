import React, { useEffect } from 'react'
import { View } from 'react-native'
import { Screen } from './components'
import {
    Heading,
    IconButton,
    ThemedText,
} from '@components'
import { Bipster } from '@modules'
import { useBips } from '@bips'
import { useModal } from '@modal'
import { loadBips } from '@utils/bips'

export default props => {
    const { bips, setBips } = useBips()
    const { setModal } = useModal()

    useEffect(() => {
        const fetchBips = async () => {
            const bips = await loadBips()
            if (bips) setBips(bips)
        }
        if (!bips || !bips.length) {
            fetchBips()
        }
    }, [])

    return (
        <Screen
            {...props}
            secure={true}
        >
    
            <View style={{ flex: 1 }}>
    
                <Heading
                    title={`Bipster - ${bips.length} bip${bips.length !== 0 ? 's' : ''}`}
                    // onBack={() => props.navigation.navigate('Home')}
                >
                    <IconButton
                        name='camera-sharp'
                        onPress={() => setModal('CAPTURE')}
                        size={30}
                        color='tomato'
                    />
                </Heading>

                <View style={{ flex: 1 }}>
                    {bips.length > 0
                        ? <Bipster bips={bips} />
                        : <ThemedText bold>No bips to report.</ThemedText>
                }
                </View>
    
            </View>
    
        </Screen>
    )
}