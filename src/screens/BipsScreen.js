import React, { useEffect, useState } from 'react'
import {
    Pressable,
    View,
} from 'react-native'
import { Screen } from './components'
import {
    Heading,
    ThemedText,
    SplitScreen,
} from '@components'
import { BipMap, Bipster } from '@modules'
import { useBips } from '@bips'
import { useModal } from '@modal'
import { useNotification } from '@notification'
import { useSocket } from '@socket'
import { loadBips } from '@utils/bips'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faCarBurst } from '@fortawesome/free-solid-svg-icons/faCarBurst'

export default props => {
    
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
    const { addNotification } = useNotification()
    const { socket } = useSocket()

    const { setNewModal } = useModal()
    const [ alerted, setAlerted ] = useState(false)
    const [ currentBipIndex, setCurrentBipIndex ] = useState(null)
    const [ mode, setMode ] = useState(0.5)

    const handleNewBip = bip => {
        addBip(bip)
        addNotification('active bip reported')
    }

    useEffect(() => {
        const fetchBips = async () => {
            setBipsLoading(true)
            const bips = await loadBips()
            setBipsLoading(false)
            if (bips) setBips(bips)
        }
        if (!bips || !bips.length) {
            fetchBips()
        }
        
        socket.on('new_bip', handleNewBip)
        socket.on('deleted_bip', removeBip)
    }, [])

    useEffect(() => {
        if (newBip) {
            setCurrentBipIndex(0)
            setNewBip(false)
        }
    }, [newBip])

    const onBipSelected = index => {
        setCurrentBipIndex(index)
    }

    const onBipDeleted = (id, index) => {
        // const newIndex = currentBipIndex < 1 ? 0 : currentBipIndex - 1
        // if (currentBipIndex === 0)
        if (index === currentBipIndex) {
            setCurrentBipIndex(null)
        }
        removeBip(id)
    }

    return (
        <Screen
            {...props}
            secure={true}
        >
            <Heading
                title='Bipsy'
            >
                <View
                    style={{
                        flexBasis: 'auto',
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                    }}
                >
                    <ThemedText style={{ flex: 1, flexGrow: 1 }}>
                        {`${bips.length} bip${bips.length !== 1 ? 's' : ''}`}
                    </ThemedText>
                    <Pressable
                        onPress={() => setNewModal('CAPTURE')}
                        style={{
                            flex: 1,
                            flexBasis: 'auto',
                            flexGrow: 0,
                            flexDirection: 'row',
                            justifyContent: 'center',
                            alignItems: 'center',
                            gap: 10,
                            paddingHorizontal: 15,
                            height: 28,
                            borderRadius: 8,
                            overflow: 'hidden',
                            backgroundColor: 'tomato',
                        }}
                    >
                        <FontAwesomeIcon
                            icon={faCarBurst}
                            size={24}
                            color='#fff'
                            style={{
                                transform: [{
                                    rotate: '-15deg',
                                }],
                            }}
                        />
                        <ThemedText color='#fff' bold>Capture Bip</ThemedText>
                    </Pressable>
                </View>
            </Heading>
            <SplitScreen
                state={mode}
                change={setMode}
            >
                <BipMap
                    currentIndex={currentBipIndex}
                    onBipSelected={onBipSelected}
                />
                <Bipster
                    bips={bips}
                    loading={bipsLoading}
                    currentIndex={currentBipIndex}
                    onDeleted={onBipDeleted}
                    onSelected={onBipSelected}
                />
            </SplitScreen>
            {/* <View
                // ref={container}
                // onPointerUp={handleTouchEnd}
                // onTouchEnd={handleTouchEnd}
                // onLayout={e => setContainerHeight(e.nativeEvent.target.clientHeight)}
                style={{
                    flex: 1,
                    flexGrow: 1,
                    gap: 5,
                }}
            >
                <View
                    // ref={map}
                    style={{
                        flex: 5,
                        // flexBasis: 'auto',
                        // flexGrow: 1,
                        // height: maxHeight,
                        // maxHeight: maxHeight,
                    }}
                >
                    <BipMap
                        currentIndex={currentBipIndex}
                        onBipSelected={onBipSelected}
                    />
                </View> */}
                
                {/* <Pressable
                    ref={pad}
                    onPointerDown={handleTouchStart}
                    // onPointerMove={handleTouchMove}
                    onTouchStart={handleTouchStart}
                    // onTouchMove={handleTouchMove}
                    style={{
                        flexBasis: 30,
                        // flexGrow: 0,
                        // flexDirection: 'row',
                        // justifyContent: 'center',
                        // backgroundColor: '#eee',
                        // borderRadius: 8,
                        // overflow: 'hidden',
                        // marginVertical: 5,
                        flexDirection: 'row',
                        alignItems: 'center',
                    }}
                >
                    <Icon
                        name='menu-sharp'
                        size={18}
                        color='#ccc'
                        style={{ marginHorizontal: 'auto' }}
                    />
                </Pressable> */ }

                {/* <Heading
                    title='Bipsy'
                >
                    <View
                        style={{
                            flexBasis: 'auto',
                            flexGrow: 0,
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                        }}
                    >
                        <ThemedText style={{ flex: 1, flexGrow: 1 }}>
                            {`${bips.length} bip${bips.length !== 0 ? 's' : ''}`}
                        </ThemedText>
                        <Pressable
                            onPress={() => setNewModal('CAPTURE')}
                            style={{
                                flex: 1,
                                flexBasis: 'auto',
                                flexGrow: 0,
                                flexDirection: 'row',
                                justifyContent: 'center',
                                alignItems: 'center',
                                gap: 10,
                                paddingHorizontal: 15,
                                height: 28,
                                borderRadius: 8,
                                overflow: 'hidden',
                                backgroundColor: 'tomato',
                            }}
                        >
                            <FontAwesomeIcon
                                icon={faCarBurst}
                                size={24}
                                color='#fff'
                                style={{
                                    transform: [{
                                        rotate: '-15deg',
                                    }],
                                }}
                            />
                            <ThemedText color='#fff' bold>Capture Bip</ThemedText>
                        </Pressable>
                    </View>
                </Heading>

                <View
                    style={{
                        flex: 6,
                    }}
                >
                    {bipsLoading
                        ? <ThemedText>Loading Bips...</ThemedText>
                        : bips.length > 0
                            ? (
                                <Bipster
                                    bips={bips}
                                    currentIndex={currentBipIndex}
                                    onSelected={onBipSelected}
                                />
                            )
                            : <ThemedText bold>No bips to report.</ThemedText>
                    }
                </View>
            </View> */}
    
        </Screen>
    )
}