import React, { useEffect, useRef, useState } from 'react'
import {
    Animated,
    Easing,
    Pressable,
    Text,
    View,
} from 'react-native'
import { ThemedText } from '@components'

const Block = ({ col, row, width, height, maxHeight, maxWidth, label, color, onPress, pressable, ...props }) => {

    const transitionX = useRef(new Animated.Value(col * (width / maxWidth))).current
    const transitionY = useRef(new Animated.Value(row * (height / maxHeight))).current

    const [ currentColumn, setCurrentColumn ] = useState(null)
    const [ currentRow, setCurrentRow ] = useState(null)

    useEffect(() => {
        setCurrentColumn(col)
        setCurrentRow(row)
    }, [])

    useEffect(() => {
        animateX(col * (width / maxWidth))
    }, [currentColumn])

    useEffect(() => {
        animateY(row * (height / maxHeight))
    }, [currentRow])

    useEffect(() => {
        if (col !== currentColumn) {
            setCurrentColumn(col)
        }
    }, [col])

    useEffect(() => {
        if (row !== currentRow) {
            setCurrentRow(row)
        }
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
                {...props}
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
                        backgroundColor: color,
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

    const numRows = 5
    const numCols = 5
    const numBlocks = numRows * numCols - 1
    const blockWidth = (puzzleDims.width - (numCols - 1) + 2) / numCols
    const blockHeight = (puzzleDims.height - (numRows - 1) + 2) / numRows
    const blockColors = [ 'tomato', 'olive', 'teal' ]
    const [ blocks, setBlocks ] = useState(null)
    const [ emptyCol, setEmptyCol ] = useState(numCols - 1)
    const [ emptyRow, setEmptyRow ] = useState(numRows - 1)

    useEffect(() => {
        const blockData = []
        let col = 0
        let row = 0
        while (blockData.length < numBlocks) {
            const randomNum = Math.floor(Math.random() * blockColors.length)
            const block = {
                col: col,
                row: row,
                width: blockWidth,
                height: blockHeight,
                color: blockColors[randomNum],
            }
            blockData.push(block)
            if (col + 1 < numCols) {
                col++
            } else {
                col = 0
                row++
            }
            
        }
        
        setBlocks(blockData)
    }, [])

    const updateEmpty = (col, row) => {
        setEmptyCol(col)
        setEmptyRow(row)
    }

    const updateBlock = (index, col, row) => {
        setBlocks([
            ...blocks.slice(0, index), {
                ...blocks[index],
                col: emptyCol,
                row: emptyRow,
            },
            ...blocks.slice(index + 1),
        ])

        updateEmpty(col, row)
    }

    return (
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
                    // height: puzzleDims.height,
                }}
            >
                {blocks !== null && blocks.map(({ col, row, width, height, color }, index) => (
                    <Block
                        key={`block-${index}`}
                        col={col}
                        row={row}
                        width={width}
                        height={height}
                        maxWidth={puzzleDims.width}
                        maxHeight={puzzleDims.height}
                        label={index + 1}
                        color={color}
                        onPress={() => updateBlock(index, col, row)}
                        pressable={(row === emptyRow && Math.abs(col - emptyCol) === 1) || (col === emptyCol && Math.abs(row - emptyRow) === 1)}
                    />
                ))}
            </View>
        </View>
    )
}