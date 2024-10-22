import React, { useEffect, useState } from 'react'
import { View } from 'react-native'
import {
    BipList,
    BipMap,
} from './components'
import {
    SplitScreen,
} from '@components'
import { useBips } from '@modules/Bipster'

export default Bipster = () => {
    
    const {
        addBip,
        bips,
        bipsLoading,
        newBip,
        setNewBip,
        removeBip,
        setBips,
        setBipsLoading,
    } = useBips()

    const [ currentBipIndex, setCurrentBipIndex ] = useState(null)
    const [ mode, setMode ] = useState(0.5)

    useEffect(() => {
        if (bips && !currentBipIndex) setCurrentBipIndex(0)
    }, [bips])

    const onBipSelected = index => {
        setCurrentBipIndex(index)
    }

    const onBipDeleted = (id, index) => {
        // if (currentBipIndex === 0)
        if (index === currentBipIndex) {
            setCurrentBipIndex(currentBipIndex < 0 ? currentBipIndex - 1 : null)
        } else {
            if (index < currentBipIndex) {
                setCurrentBipIndex(null)
                setCurrentBipIndex(currentBipIndex - 1)
            }
        }
        removeBip(id)
    }

    return (
        <View style={{ flex: 1 }}>
            <SplitScreen
                state={mode}
                change={setMode}
            >
                <BipMap
                    currentIndex={currentBipIndex}
                    onBipSelected={onBipSelected}
                />

                <BipList
                    bips={bips}
                    loading={bipsLoading}
                    currentIndex={currentBipIndex}
                    onDeleted={onBipDeleted}
                    onSelected={onBipSelected}
                />
            </SplitScreen>
        </View>
    )
}