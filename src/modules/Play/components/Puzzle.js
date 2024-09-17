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

const Block = ({ col, row, label, color, height, width, maxHeight, maxWidth, onPress, pressable, ...props }) => {

    const transitionX = useRef(new Animated.Value(col * (width / maxWidth))).current
    const transitionY = useRef(new Animated.Value(row * (height / maxHeight))).current
    
    useEffect(() => {
        animateX(col * (width / maxWidth))
    }, [col])

    useEffect(() => {
        animateY(row * (height / maxHeight))
    }, [row])

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
                    borderRadius: 8,
                    overflow: 'hidden',
                }}
            >
                <View
                    style={{
                        flex: 1,
                        height: '100%',
                        backgroundColor: color,
                        // opacity: 0.9,
                        shadowColor: '#fff',
                        shadowOffset: {
                            width: 3,
                            height: 3,
                        },
                        shadowOpacity: 0.75,
                        shadowRadius: 1,
                        elevation: 3,
                    }}
                >
                    <ThemedText
                        color='#fee'
                        size={24}
                        bold
                        style={{
                            lineHeight: height,
                            marginHorizontal: 'auto',
                        }}
                    >
                        {label}
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

    const numRows = 3
    const numCols = 3
    const numBlocks = numRows * numCols - 1
    const blockWidth = (puzzleDims.width - (numCols - 1) + 2) / numCols
    const blockHeight = (puzzleDims.height - (numRows - 1) + 2) / numRows
    const blockColors = [ '#7CB9E8', '#662d91', '#FF69B4' ]
    const [ blocks, setBlocks ] = useState(null)
    const [ emptyPos, setEmptyPos ] = useState({ emptyCol: numCols - 1, emptyRow: numRows - 1 })
    const { emptyCol, emptyRow } = useMemo(() => emptyPos, [emptyPos])

    const initBlocks = () => {
        let tiles = []
        let col = 0
        let row = 0
        while (tiles.length < numBlocks) {
            const randomNum = Math.floor(Math.random() * blockColors.length)
            const tile = {
                col,
                row,
                color: blockColors[randomNum],
                label: tiles.length + 1,
            }
            tiles.push(tile)
            if (col + 1 < numCols) {
                col++
            } else {
                if (row + 1 < numRows) {
                    col = 0
                    row++
                }
            }
        }

        setBlocks(tiles)
    }

    useEffect(() => {
        initBlocks()
    }, [])

    const shuffle = () => {
        let pile = blocks.slice()
        let col = 0
        let row = 0
        let shuffled = []
        while (shuffled.length < numBlocks) {
            const index = Math.floor(Math.random() * pile.length)
            const tile = pile.splice(index, 1)[0]
            shuffled.push({
                ...tile,
                col,
                row,
            })
            
            if (col + 1 < numCols) {
                col++
            } else {
                if (row + 1 < numRows) {
                    col = 0
                    row++
                }
            }
        }
        setBlocks(shuffled)
        setEmptyPos({ emptyCol: numCols - 1, emptyRow: numRows - 1 })
    }

    const switchBlocks = currentIndex => {
        let switched = blocks.slice()
        // console.log('')
        // console.log(`moving index from col/row ${switched[currentIndex].col}/${switched[currentIndex].row} to col/row ${emptyCol}/${emptyRow}`)
        const { col, row } = switched[currentIndex]
        switched[currentIndex] = {
            ...switched[currentIndex],
            col: emptyCol,
            row: emptyRow,
        }
        setEmptyPos({
            emptyCol: col,
            emptyRow: row,
        })
        setBlocks(switched)
    }

    const handlePress = index => {
        switchBlocks(index)
    }

    const renderBlocks = () => blocks.map(({ col, row, ...block }, index) => (
        <Block
            key={`block-${index}`}
            label={block.label}
            color={block.color}
            col={col}
            row={row}
            width={blockWidth}
            height={blockHeight}
            maxWidth={puzzleDims.width}
            maxHeight={puzzleDims.height}
            onPress={() => handlePress(index)}
            pressable={(row === emptyRow && Math.abs(col - emptyCol) === 1) || (col === emptyCol && Math.abs(row - emptyRow) === 1)}
        />
    ))

    return (
        <View style={{ gap: 10 }}>

            <View
                style={{
                    backgroundColor: '#000',
                    width: puzzleDims.width,
                    height: puzzleDims.height,
                    backgroundColor: 'rgba(200, 0, 0, 0.25)',
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
                    {blocks && renderBlocks()}
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