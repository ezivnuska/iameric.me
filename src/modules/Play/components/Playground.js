import 'react-native-gesture-handler'
import React, { useEffect, useMemo, useState } from 'react'
import { StyleSheet, View } from 'react-native'
import Animated, {
	Easing,
	ReduceMotion,
	useAnimatedStyle,
	useSharedValue,
	// withDecay,
	withSpring,
	withTiming,
} from 'react-native-reanimated'
import {
	Gesture,
	GestureDetector,
	GestureHandlerRootView,
} from 'react-native-gesture-handler'
import {
	IconButton,
	ThemedText,
} from '@components'
import { getModifiedColor } from '@utils'

const TimeDisplay = ({ time }) => {

    const minutes = useMemo(() => {
        let m = Math.floor(time / 60)
        return m
    }, [time])

    const seconds = useMemo(() => {
        let s = time < 60 ? time : time % 60
        return s
    }, [time])

    return (
        <ThemedText
            size={24}
            bold
        >
            {minutes > 0 && `${minutes}m `}{`${seconds}s`}
        </ThemedText>
    )
}

const Timer = ({ time, onChange }) => {

    useEffect(() => {
        const interval = setInterval(() => {
            onChange(time + 1)
        }, 1000)

        return () => clearInterval(interval)
    }, [time])

    return (
        <View
            style={{
                marginHorizontal: 'auto',
            }}
        >
            <TimeDisplay time={time} />

        </View>
    )
}

export default ({ level }) => {

	const [itemSize, setItemSize] = useState(null)
	const [tiles, setTiles] = useState([])
    const [time, setTime] = useState(0)
    const [score, setScore] = useState(null)
	const [timing, setTiming] = useState(false)
	const [gameSize, setGameSize] = useState(null)
	const [correct, setCorrect] = useState(true)

	const offsetX = useSharedValue(0)
	const offsetY = useSharedValue(0)

	const onLayout = e => {
		setGameSize(e.nativeEvent.target.offsetParent.clientWidth)
	}

	useEffect(() => {
		setItemSize(gameSize / level)
	}, [gameSize])

	useEffect(() => {
		if (itemSize) {
			initTiles()
		}
	}, [itemSize])

	useEffect(() => {
		offsetX.value = 0
		offsetY.value = 0
        checkTiles()
	}, [tiles])

	useEffect(() => {
		if (timing && correct) stopTiming()
	}, [correct])

	const getTileByColRow = (col, row) => {
		const tile = tiles.filter(t => t.col === col && t.row === row)[0]
		return tile
	}
	
	const checkTiles = () => {
		if (!timing) return
		const sorted = []
		let row = 0
		let col = 0
		let sorting = true
		
		while (sorting) {
			const tile = getTileByColRow(col, row)
			if (!tile) {
				sorting = false
			} else {
				sorted[sorted.length] = tile
				
				if (col + 1 < level) {
					col++
				} else {
					col = 0
					row++
				}
			}
		}
		
		setCorrect(sorted.length === tiles.length)
	}

	const getEmptyCol = () => {
		let cols = []
		while (cols.length < level) {
			cols.push(tiles.filter(t => t.col === cols.length))
		}
		let emptyCol = null
		cols.map((c, i) => {
			if (c.length < level) {
				emptyCol = i
			}
		})
		return emptyCol
	}
	
	const getEmptyRow = () => {
		let rows = []
		while (rows.length < level) {
			rows.push(tiles.filter(t => t.row === rows.length))
		}
		let emptyRow = null
		rows.map((r, i) => {
			if (r.length < level) {
				emptyRow = i
			}
		})
		return emptyRow
	}

	const { emptyCol, emptyRow } = useMemo(() => {
		if (!tiles.length) return {}
		const emptyCol = getEmptyCol()
		const emptyRow = getEmptyRow()
		return { emptyCol, emptyRow }
	}, [tiles])

	const initTiles = () => {
		const array = []
		while (array.length < level * level - 1) {
			const col = array.length % level
			const row = Math.floor(array.length / level)
			array.push({
				id: array.length,
				col,
				row,
			})
		}
		setTiles(array)
	}
	
	const startGame = () => {
        shuffle()
        // devShuffle()
        setTime(0)
        setTiming(true)
    }

	const onTimer = value => {
		setTime(value)
	}

	const stopTiming = () => {
		setScore(time)
		setTiming(false)
	}

	const handlePress = () => {
		if (timing) {
            stopTiming()
        } else {
            startGame()
        }
	}
	
	const tileIsDisabled = tile => {
		return !(emptyCol === tile.col || emptyRow === tile.row)
	}

	const directionIsVertical = direction => direction === 'up' || direction === 'down'

	const getColRowFromId = id => {
		const tileFromId = tiles.filter(t => t.id == id)[0]
		const { col, row } = tileFromId
		return { col, row }
	}

	const devShuffle = () => {
		const array = tiles.map((t, i) => {
			return i === tiles.length - 1 ? { ...t, col: t.col + 1 } : t
		})
		setTiles(array)
	}
	
	const shuffle = () => {
        let pile = tiles.slice()
        let col = 0
        let row = 0
        let shuffled = []
        while (shuffled.length < level * level - 1) {
            const index = Math.floor(Math.random() * pile.length)
            const tile = pile.splice(index, 1)[0]
            shuffled.push({
                ...tile,
                col,
                row,
            })
            
            if (col + 1 < level) {
                col++
            } else {
                if (row + 1 < level) {
                    col = 0
                    row++
                }
            }
        }
        setTiles(shuffled)
    }

	const getDirectionAndDistance = id => {
		const { col, row } = getColRowFromId(id)
		let direction = null
		let distance = null
		if (emptyCol === col) {
			if (emptyRow - row < 0) {
				direction = 'up'
			} else {
				direction = 'down'
			}
			distance = Math.abs(row - emptyRow)
		} else {
			if (emptyCol - col < 0) {
				direction = 'left'
			} else {
				direction = 'right'
			}
			distance = Math.abs(col - emptyCol)
		}
		return {
			direction,
			distance,
		}
	}

	const setDraggableTiles = id => {
		const { direction, distance } = getDirectionAndDistance(id)
		const { col, row } = getColRowFromId(id)
		const draggableIds = [Number(id)]
		if (distance > 1) {
			tiles.map(t => {
				if (directionIsVertical(direction)) {
					if (t.col === emptyCol) {
						if (direction === 'up') {
							if (t.row > emptyRow && t.row < row) {
								draggableIds.push(t.id)
							}
						} else {
							if (t.row < emptyRow && t.row > row) {
								draggableIds.push(t.id)
							}
						}
					}
				} else {
					if (t.row === emptyRow) {
						if (direction === 'left') {
							if (t.col > emptyCol && t.col < col) {
								draggableIds.push(t.id)
							}
						} else {
							if (t.col < emptyCol && t.col > col) {
								draggableIds.push(t.id)
							}
						}
					}
				}
				return t
			})
		}

		const updatedTiles = tiles.map(t => draggableIds.indexOf(t.id) > -1
			? ({
				...t,
				dragging: direction,
			})
			: t
		)
		
		setTiles(updatedTiles)
	}

	const onTouchStart = event => {
		const { id } = event.target.offsetParent
		setDraggableTiles(id)
	}

	const onTouchMove = event => {
		const { target, changeX, changeY, translationX, translationY, velocityX, velocityY } = event
		const { id } = target.offsetParent
		const { direction } = getDirectionAndDistance(id)
		if (directionIsVertical(direction)) {
			if (direction === 'up') {
				if (translationY >= -itemSize && translationY <= 0) offsetY.value = translationY//changeY//
			} else {
				if (translationY <= itemSize && translationY >= 0) offsetY.value = translationY//changeY//
			}
		} else {
			if (direction === 'left') {
				if (translationX >= -itemSize && translationX <= 0) offsetX.value = translationX//changeX//
			} else {
				if (translationX <= itemSize && translationX >= 0) offsetX.value = translationX//changeX//
			}
		}
	}

	const moveTiles = event => {
		const { target } = event
		const { id } = target.offsetParent
		const { direction } = getDirectionAndDistance(id)
		const updatedTiles = tiles.map(t => {
			if (t.dragging) {
				let newCol = t.col
				let newRow = t.row
				if (directionIsVertical(direction)) {
					newRow = direction === 'up'
						? t.row - 1
						: t.row + 1
				} else {
					newCol = direction === 'left'
						? t.col - 1
						: t.col + 1
				}
				return {
					...t,
					dragging: null,
					col: newCol,
					row: newRow,
				}
			}
			return t
		})
		setTiles(updatedTiles)
		offsetX.value = 0
		offsetY.value = 0
	}

	const getNewOffset = event => {
		const { id } = event.target.offsetParent
		const { direction } = getDirectionAndDistance(id)
		let newOffsetX = 0
		let newOffsetY = 0
		if (directionIsVertical(direction)) {
			newOffsetY = direction === 'up'
				? -itemSize
				: itemSize
		} else {
			newOffsetX = direction === 'left'
				? -itemSize
				: itemSize
		}
		return {
			x: newOffsetX,
			y: newOffsetY,
		}
	}

	const onTouchEnd = event => {
		const { target, translationX, translationY, velocityX, velocityY } = event
		const { id } = target.offsetParent
		const { direction } = getDirectionAndDistance(id)
		let moveThreshold = itemSize / 2
		if (velocityY > 1000 || velocityX > 1000) {
			const { x, y } = getNewOffset(event)
			if (directionIsVertical(direction)) {
				offsetY.value = y
				// offsetY.value = withTiming(y, {
				// 	duration: 50,
				// 	easing: Easing.in(Easing.quad),
				// 	reduceMotion: ReduceMotion.System,
				// }, () => moveTiles(event))
			} else {
				offsetX.value = x
				// offsetX.value = withTiming(x, {
				// 	duration: 50,
				// 	easing: Easing.in(Easing.quad),
				// 	reduceMotion: ReduceMotion.System,
				// }, () => moveTiles(event))
			}

			moveTiles(event)
		} else {
			const { x, y } = getNewOffset(event)
			// const clamp = (direction === 'up' || direction === 'left')
			// 	? [ -itemSize, 0 ]
			// 	: [ 0, itemSize ]
			
			if (directionIsVertical(direction)) {
				if (Math.abs(translationY) > moveThreshold) {
					offsetY.value = y
					moveTiles(event)
					// offsetY.value = withTiming(y, {
					// 	duration: 50,
					// 	easing: Easing.out(Easing.quad),
					// 	reduceMotion: ReduceMotion.System,
					//   }, () => moveTiles(event))

					// offsetY.value = withDecay({
					// 	velocity: velocityY,
					// 	rubberBandEffect: true,
					// 	clamp,
					// })
				} else {
					offsetY.value = withSpring(0, {
						mass: 1,
						damping: 10,
						stiffness: 100,
						overshootClamping: false,
						restDisplacementThreshold: 0.01,
						restSpeedThreshold: 2,
						reduceMotion: ReduceMotion.System,
						duration: 250,
					  }, clearDrag)
					// offsetY.value = withDecay({
					// 	velocity: velocityY,
					// 	rubberBandEffect: true,
					// 	clamp,
					// })
				}
			} else {
				if (Math.abs(translationX) > moveThreshold) {
					offsetX.value = x
					moveTiles(event)
					// offsetX.value = withTiming(x, {
					// 	duration: 50,
					// 	easing: Easing.out(Easing.quad),
					// 	reduceMotion: ReduceMotion.System,
					// }, () => moveTiles(event))
					
				} else {
					offsetX.value = withSpring(0, {
						mass: 1,
						damping: 10,
						stiffness: 100,
						overshootClamping: false,
						restDisplacementThreshold: 0.01,
						restSpeedThreshold: 2,
						reduceMotion: ReduceMotion.System,
						duration: 250,
					  }, clearDrag)
				}
			}
		}
	}

	const clearDrag = () => {
		setTiles(tiles.map(t => ({
			...t,
			dragging: null,
		})))
	}

	const animatedStyles = useAnimatedStyle(() => ({
		transform: [
			{ translateX: offsetX.value },
			{ translateY: offsetY.value },
			// { scale: withTiming(pressed.value ? 1.2 : 1) },
		],
	}))

	const getBasicTileStyles = tile => ({
		position: 'absolute',
		top: tile.row * itemSize,
		left: tile.col * itemSize,
		height: itemSize,
		width: itemSize,
		overflow: 'hidden',
		borderRadius: 8,
		cursor: 'default',
		backgroundColor: getModifiedColor('#b58df1', 25),
	})

	const renderTileContents = tile => (
		<View
			style={{ flex: 1, width: '100%' }}
		>
			<ThemedText
				bold
				color='#FFE04B'
				align='center'
				size={48}
				style={{
					flex: 1,
					lineHeight: itemSize,
				}}
			>
				{tile.id + 1}
			</ThemedText>
		</View>
	)

	const renderDisabledTile = tile => (
		<View
			key={`tile-${tile.id}`}
			style={getBasicTileStyles(tile)}
		>
			{renderTileContents(tile)}
		</View>
	)

	const renderMovableTile = tile => {

		const pan = Gesture.Pan()
			.runOnJS(true)
			.onBegin(onTouchStart)
			.onChange(onTouchMove)
			.onFinalize(onTouchEnd)

		return (
			<Animated.View
				id={tile.id}
				key={`tile-${tile.id}`}
				style={[
					getBasicTileStyles(tile),
					{
						backgroundColor: '#b58df1',
						cursor: 'grab'
					},
					tile.dragging ? animatedStyles : null,
				]}
			>
				<GestureDetector
					gesture={pan}
				>
					{renderTileContents(tile)}
					{/* <View
						style={{
							flex: 1,
							width: '100%',
							margin: 1,
							overflow: 'hidden',
							borderRadius: 8,
							backgroundColor: getModifiedColor('#b58df1', 25),
						}}
					>
						<ThemedText
							bold
							color='#FFE04B'
							align='center'
							size={48}
							style={{
								flex: 1,
								lineHeight: itemSize,
							}}
						>
							{tile.id + 1}
						</ThemedText>
					</View> */}
					{/* {renderMovableTile(tile)} */}
				</GestureDetector>
			</Animated.View>
		)
	}

	const renderTile = tile => {
		return tileIsDisabled(tile)
			? renderDisabledTile(tile)
			: renderMovableTile(tile)}

	return (
		<View style={{ flex: 1, justifyContent: 'flex-start', gap: 10 }}>
			
			{correct
				? score > 0
					? <TimeDisplay time={score} />
					: <ThemedText>Start Game</ThemedText>
				: <ThemedText>'Solve It!'</ThemedText>
			}

			{/* <GestureHandlerRootView style={styles.container}>
				<View
					onLayout={onLayout}
					style={[
						styles.container,
						{
							position: 'relative',
						},
					]}
				>
					{tiles.length > 0 && tiles.map(item => renderTile(item))}
				</View>
			</GestureHandlerRootView> */}

			<View
				onLayout={onLayout}
			>
				{gameSize && (
					<GestureHandlerRootView
						// style={styles.container}
					>
						<View
							// onLayout={onLayout}
							style={{
								width: gameSize,
								height: gameSize,
								// alignItems: 'center',
								// justifyContent: 'center',
								// width: '100%',
								// borderWidth: 1,
								// borderColor: 'red',
								position: 'relative',
							}}
						>
							{tiles.length > 0 && tiles.map(item => renderTile(item))}
						</View>
					</GestureHandlerRootView>
				)}
			</View>

			<View style={{ flexGrow: 0 }}>
				{timing && (
					<Timer
						time={time}
						onChange={onTimer}
					/>
				)}
				
				<View style={{ marginHorizontal: 'auto' }}>
					<IconButton
						name={timing ? 'close-circle-sharp' : 'reload-circle-sharp'}
						size={30}
						onPress={handlePress}
					/>
				</View>
			</View>
		</View>
	)
}