import React, { useEffect, useMemo, useRef, useState } from 'react'
import {
    Animated,
    Easing,
    Pressable,
    View,
} from 'react-native'
import {
    IconButton,
    ThemedText,
} from '@components'

const Block = ({ block, height, width, maxHeight, maxWidth, onPress, pressable, ...props }) => {

    const [positionX, setPositionX] = useState(block.posX)
    const [positionY, setPositionY] = useState(block.posY)

    const transitionX = useRef(new Animated.Value(positionX)).current
    const transitionY = useRef(new Animated.Value(positionY)).current

    useEffect(() => {
        if (block) {
            const { newPosX, newPosY } = block
            if (newPosX) animateX(newPosX)
            if (newPosY) animateY(newPosY)
        }
    }, [block])

    const animateX = toValue => {
        Animated.timing(transitionX, {
            toValue,
            duration: 100,
            useNativeDriver: true,
            easing: Easing.out(Easing.quad),
        }).start()
    }

    const animateY = toValue => {
        Animated.timing(transitionY, {
            toValue,
            duration: 100,
            useNativeDriver: true,
            easing: Easing.out(Easing.quad),
        }).start()
    }

    return (
        <Animated.View
            {...props}
            style={{
                position: 'absolute',
                top: transitionY.interpolate({
                    inputRange: [0, 1],
                    outputRange: [0, maxHeight],
                }),
                left: transitionX.interpolate({
                    inputRange: [0, 1],
                    outputRange: [0, maxWidth],
                }),
            }}
        >
            <Pressable
                onPress={onPress}
                disabled={!pressable}
                style={{
                    height: height,
                    width: width,
                    padding: 1,
                }}
            >
                <View
                    style={{
                        flex: 1,
                        height: '100%',
                        backgroundColor: block.color,
                    }}
                >
                    <ThemedText
                        color='#000'
                        size={24}
                        bold
                        style={{
                            lineHeight: height,
                            marginHorizontal: 'auto',
                        }}
                    >
                        {block.label}
                    </ThemedText>
                </View>
            </Pressable>
        </Animated.View>
    )
}

export default () => {

    const puzzleDims = {
        height: 360,
        width: 360,
    }

    const numRows = 5
    const numCols = 5
    const numBlocks = numRows * numCols - 1
    const blockWidth = (puzzleDims.width - (numCols - 1) + 2) / numCols
    const blockHeight = (puzzleDims.height - (numRows - 1) + 2) / numRows
    const blockColors = [ 'tomato', 'olive', 'teal' ]
    const [ blocks, setBlocks ] = useState(null)
    const [ emptyIndex, setEmptyIndex ] = useState(numBlocks)

    const initBlocks = () => {
        let tiles = []
        let col = 0
        let row = 0
        while (tiles.length < numBlocks) {
            const randomNum = Math.floor(Math.random() * blockColors.length)
            const { positionX, positionY } = getPositionByIndex(tiles.length)
            const tile = {
                posX: positionX,
                posY: positionY,
                width: blockWidth,
                height: blockHeight,
                color: blockColors[randomNum],
                label: tiles.length + 1,
            }
            tiles.push(tile)
        }
        if (col + 1 < numCols) {
            col++
        } else {
            col = 0
            row++
        }
        setBlocks(tiles)
    }

    useEffect(() => {
        initBlocks()
    }, [])

    const shuffle = () => {
        let pile = blocks.slice()
        let shuffled = []
        setEmptyIndex(numBlocks)
        while (shuffled.length < blocks.length) {
            const index = Math.floor(Math.random() * pile.length)
            const tile = pile.splice(index, 1)[0]
            shuffled.push(tile)
        }
        setBlocks(shuffled.map((s, i) => {
            const { positionX, positionY } = getPositionByIndex(i)
            return {
                ...s,
                newPosX: positionX,
                newPosY: positionY,
            }
        }))
    }

    const getCoords = index => {
        const col = index % numRows
        const row = Math.floor(index / numCols)
        
        return {
            col,
            row,
        }
    }

    const getPositionByIndex = index => {
        const col = index % numRows
        const row = Math.floor(index / numCols)
        
        return {
            positionX: col * (blockWidth / puzzleDims.width),
            positionY: row * (blockHeight / puzzleDims.height),
        }
    }

    const getEmptyCoords = () => {
        const { col, row } = getCoords(emptyIndex)
        return {
            emptyCol: col,
            emptyRow: row,
        }
    }

    const getEmptySpace = () => { 
        const { positionX, positionY } = getPositionByIndex(emptyIndex)
        return {
            emptyPosX: positionX,
            emptyPosY: positionY,
        }
    }

    const switchBlocks = currentIndex => {
        const index = currentIndex
        const { emptyPosX, emptyPosY } = getEmptySpace()
        setEmptyIndex(index)
        let switched = blocks
        switched[index] = {
            ...switched[index],
            newPosX: emptyPosX,
            newPosY: emptyPosY,
        }
        
        setBlocks(switched)
    }

    const handlePress = index => {
        switchBlocks(index)
    }

    

    const renderBlocks = () => {
        return blocks && blocks.map((block, index) => {
            const { col, row } = getCoords(index)
            const { emptyCol, emptyRow } = getEmptyCoords()
            return (
                <Block
                    key={`block-${index}`}
                    block={block}
                    width={blockWidth}
                    height={blockHeight}
                    maxWidth={puzzleDims.width}
                    maxHeight={puzzleDims.height}
                    onPress={() => handlePress(index)}
                    pressable={(row === emptyRow && Math.abs(col - emptyCol) === 1) || (col === emptyCol && Math.abs(row - emptyRow) === 1)}
                />
            )
        })
    }

    return blocks && (
        <View style={{ gap: 10 }}>

            <View
                style={{
                    backgroundColor: '#000',
                    width: puzzleDims.width,
                    height: puzzleDims.height,
                    backgroundColor: '#000',
                    padding: 1,
                    marginHorizontal: 'auto',
                }}
            >
                <View
                    style={{
                        position: 'relative',
                        width: '100%',
                        flex: 1,
                    }}
                >
                    {renderBlocks()}
                </View>
            </View>
            <View style={{ marginHorizontal: 'auto' }}>
                <IconButton
                    name='reload-circle-sharp'
                    size={30}
                    onPress={shuffle}
                />
            </View>
        </View>
    )
}