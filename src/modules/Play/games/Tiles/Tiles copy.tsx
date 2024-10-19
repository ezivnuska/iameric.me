import 'react-native-gesture-handler'
import React, { useEffect, useMemo, useState } from 'react'
import { View } from 'react-native'
import Animated, {
	Easing,
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
	GameHeader,
	Tile,
	SquareWithLabel,
} from './components'
import { ThemedText } from '@components'
import { getModifiedColor } from '@utils'
import { usePlay } from '@play'

export default () => {

	// const { ticking } = usePlay()

	const [level, setLevel] = useState(4)
	// const [itemSize, setItemSize] = useState(null)
	// const [tiles, setTiles] = useState(null)
	// const [draggedTile, setDraggedTile] = useState(null)
	
	const [gameSize, setGameSize] = useState(null)
	const [gameStatus, setGameStatus] = useState('idle')
	
	// const [empty, setEmpty] = useState({ col: level - 1, row: level - 1 })

	// const offsetX = useSharedValue(0)
	// const offsetY = useSharedValue(0)

	// const [nextTiles, setNextTiles] = useState(null)

	// useEffect(() => {
	// 	if (gameSize) setItemSize(gameSize / level)
	// }, [gameSize])

	// useEffect(() => {
	// 	if (empty && nextTiles) {
	// 		console.log('empty', empty)
	// 		updateTiles(nextTiles, empty)
	// 		setNextTiles(null)
	// 	}
	// }, [empty, nextTiles])

	const onLayout = e => {
		setGameSize(e.nativeEvent.target.offsetParent.clientWidth)
	}

	// const createTiles = async () => {
	// 	const tileArray = []
	// 	while (tileArray.length < level * level - 1) {
	// 		const col = tileArray.length % level
	// 		const row = Math.floor(tileArray.length / level)
	// 		// const draggable = getDirectionToEmpty({ col, row })
	// 		let newTile = {
	// 			id: tileArray.length,
	// 			col,
	// 			row,
	// 			draggable: null,
	// 			dragging: false,
	// 		}
	// 		tileArray.push(newTile)
	// 	}
	// 	setTiles(tileArray)
	// }

	// const getDirectionToEmpty = (tile, nextEmpty = null) => {
	// 	if (gameStatus !== 'active') return null
	// 	const { col, row } = tile
	// 	let emptyPos = nextEmpty || empty
	// 	// const emptyCol = emptyPos.col
	// 	// const emptyRow = emptyPos.row
	// 	let direction = null
	// 	if (col === emptyPos.col || row === emptyPos.row) {
	// 		const isVertical = col === emptyPos.col
	// 		if (isVertical) {
	// 			direction = (row < emptyPos.row) ? 'down' : 'up'
	// 		} else {
	// 			direction = (col < emptyPos.col) ? 'right' : 'left'
	// 		}
	// 	}
	// 	// console.log('DIRECTON', direction)
	// 	return direction
	// }

	// useEffect(() => {
	// 	if (itemSize) createTiles()
	// }, [itemSize])

	// useEffect(() => {
	// 	switch (gameStatus) {
	// 		case 'active': startGame(); break
	// 		case 'idle':
	// 		case 'resolved':
	// 		default:
	// 	}
	// }, [gameStatus])

	// const resetOffsetValues = () => {
	// 	offsetX.value = 0
	// 	offsetY.value = 0
	// }

	const getTileByColRow = (tilesToSort, col, row) => {
		return tilesToSort.filter(t => t.col === col && t.row === row)[0]
	}

	// useEffect(() => {
	// 	if (tiles) tiles.map(t => {
	// 		if (t.dragging) console.log('dragging', t.id, t.draggable)
	// 	})
	// }, [tiles])
	
	const resolveTiles = async tileArray => {
		console.log('resolving tileArray', tileArray)

		let numCorrect = 0
		let row = 0
		let col = 0
		let sorting = true
		
		while (sorting) {
			const tile = getTileByColRow(tileArray, col, row)
			if (tile && tile.id === numCorrect) {
				numCorrect++
				if (col + 1 < level) {
					col++
				} else if (row + 1 < level) {
					col = 0
					row++
				}
			} else {
				sorting = false
			}
		}
		const isCorrect = (numCorrect === tileArray.length)
		console.log('isCorrect', isCorrect)
		return isCorrect	
	}

	const handleWin = () => {
		setGameStatus('resolved')
	}

	return (
		<View style={{ flex: 1, justifyContent: 'flex-start', gap: 10 }}>
			
			<GameHeader
				status={gameStatus}
				onGameStart={() => setGameStatus('active')}
				onGameEnd={() => setGameStatus('idle')}
			/>

			<View
				onLayout={onLayout}
			>
				{gameSize && (
					<TileGame
						size={gameSize}
						status={gameStatus}
					/>
				)}
			</View>
		</View>
	)
}

const TileGame = ({ size, status, level = 4  }) => {

	const [itemSize, setItemSize] = useState(size / level)
	const [tiles, setTiles] = useState(null)
	const [empty, setEmpty] = useState({ col: level - 1, row: level - 1 })
	// const [gameStatus, setGameStatus] = useState(status)

	useEffect(() => {
		console.log('status', status)
		switch (status) {
			case 'active': startGame(); break
			case 'idle':
			case 'resolved':
			default:
		}
	}, [status])
	
	const startGame = () => {
        shuffleTiles()
	}
	
	const offsetX = useSharedValue(0)
	const offsetY = useSharedValue(0)

	const resetOffsetValues = () => {
		offsetX.value = 0
		offsetY.value = 0
	}

	const animatedStyles = useAnimatedStyle(() => {
		return {
			transform: [
				{ translateX: offsetX.value },
				{ translateY: offsetY.value },
				// { scale: withTiming(pressed.value ? 1.2 : 1) },
			],
		}
	})

	useEffect(() => {
		createTiles()
	}, [])

	const createTiles = async () => {
		const tileArray = []
		while (tileArray.length < level * level - 1) {
			const col = tileArray.length % level
			const row = Math.floor(tileArray.length / level)
			// const draggable = getDirectionToEmpty({ col, row })
			let newTile = {
				id: tileArray.length,
				col,
				row,
				draggable: null,
				dragging: false,
			}
			tileArray.push(newTile)
		}
		setTiles(tileArray)
	}

	const getDirectionToEmpty = (tile, nextEmpty = null) => {
		const { col, row } = tile
		let emptyPos = nextEmpty || empty
		// const emptyCol = emptyPos.col
		// const emptyRow = emptyPos.row
		let direction = null
		if (col === emptyPos.col || row === emptyPos.row) {
			const isVertical = col === emptyPos.col
			if (isVertical) {
				direction = (row < emptyPos.row) ? 'down' : 'up'
			} else {
				direction = (col < emptyPos.col) ? 'right' : 'left'
			}
		}
		// console.log('DIRECTON', direction)
		return direction
	}

	const getDraggingTiles = tile => {
		const { col, row } = tile
		const updatedTiles = tiles.map(t => {
			let dragging = false
			if (t.id === tile.id) {
				dragging = true
			} else if (t.draggable) {
				if (t.col === empty.col) {
					if (t.draggable === 'up' && t.row > empty.row && t.row < row) dragging = true
					if (t.draggable === 'down' && t.row < empty.row && t.row > row) dragging = true
				} else if (t.row === empty.row) {
					if (t.draggable === 'left' && t.col > empty.col && t.col < col) dragging = true
					if (t.draggable === 'right' && t.col < empty.col && t.col > col) dragging = true
				}
			}
			return {
				...t,
				dragging,
			}
		})
		// console.log('dragged tiles', updatedTiles)
		return updatedTiles
	}

	const shuffleTiles = () => {
        let shuffled = []
		let pile = tiles.slice()
		let col = 0
		let row = 0
		while (pile.length > 0) {
			const index = Math.floor(Math.random() * pile.length)
			const tile = pile.splice(index, 1)[0]
			let shuffledTile = {
				...tile,
				col,
				row,
			}
			
			if (col + 1 < level) {
				col++
			} else if (row + 1 < level) {
				col = 0
				row++
			}
			const draggable = getDirectionToEmpty(shuffledTile, empty)
			shuffledTile.draggable = draggable

			shuffled.push(shuffledTile)
		}
		
		// setEnabledTiles(shuffled)
		setTiles(shuffled)
    }

	const onTouchStart = tile => {
		console.log('startDrag', tile)
		const draggingTiles = getDraggingTiles(tile)
		setTiles(draggingTiles)
	}

	const onTouchMove = (event, tile) => {
		const { translationX, translationY } = event
		switch (tile.draggable) {
			case 'up':
				if (translationY >= -itemSize && translationY <= 0) offsetY.value = translationY//changeY//
				break
			case 'down':
				if (translationY <= itemSize && translationY >= 0) offsetY.value = translationY//changeY//
				break
			case 'left':
				if (translationX >= -itemSize && translationX <= 0) offsetX.value = translationX//changeX//
				break
			case 'right':
				if (translationX <= itemSize && translationX >= 0) offsetX.value = translationX//changeX//
				break
			default:
		}
	}

	const onTouchEnd = (event, tile) => {
		const { translationX, translationY, velocityX, velocityY } = event
		let updatedTiles = null
		let moveThreshold = itemSize / 2
		const moveY = Math.abs(translationY) > moveThreshold
		const moveX = Math.abs(translationX) > moveThreshold
		if (
			(velocityY > 1000 || velocityX > 1000)
			||
			(moveX || moveY)
		) {
			const nextEmptyPos = { col: tile.col, row: tile.row }
			updatedTiles = tiles.map(t => {
				let newTile = t
				if (t.dragging) {
					newTile.dragging = false
					if (t.draggable === 'up' || t.draggable === 'down') {
						newTile.row = t.draggable === 'up'
							? t.row - 1
							: t.row + 1
					} else {
						newTile.col = t.draggable === 'left'
							? t.col - 1
							: t.col + 1
					}
					newTile.dragging = false
				}
				const direction = getDirectionToEmpty(newTile, nextEmptyPos)
				newTile.draggable = direction
				return newTile
			})
			setEmpty(nextEmptyPos)
		} else {
			updatedTiles = tiles.map(t => ({ ...t, dragging: false }))
		}
		resetOffsetValues()
		setTiles(updatedTiles)
	}

	const renderTile = (tile, dragging) => {
		if (dragging) console.log('tile', tile.id + 1, dragging)
		return tile.draggable ? (
			<AnimatedView
				tile={tile}
				id={tile.id}
				key={`tile-${tile.id}`}
				size={itemSize}
				onTouchStart={onTouchStart}
				onTouchMove={onTouchMove}
				onTouchEnd={onTouchEnd}
				// animatedStyles={animatedStyles}
			/>
		) : (
			<Tile
				key={`tile-${tile.id}`}
				label={`${tile.id + 1}`}
				size={itemSize}
				style={{
					top: tile.row * itemSize,
					left: tile.col * itemSize,
					cursor: 'default',
                    backgroundColor: getModifiedColor('#b58df1', 25),
				}}
			/>
		)
	}

	return (
		<GestureHandlerRootView>
			<View
				style={{
					width: itemSize,
					height: itemSize,
					position: 'relative',
				}}
			>
				{tiles && tiles.map(t => renderTile(t, t.dragging))}
			</View>
		</GestureHandlerRootView>
	)
}


const AnimatedView = ({ tile, size, onTouchStart, onTouchMove, onTouchEnd, ...props }) => {

	const offsetX = useSharedValue(0)
	const offsetY = useSharedValue(0)

	const onTouch = event => {
		console.log('startDrag', tile)
		onTouchStart(event, tile)
		// const draggingTiles = getDraggingTiles(tile)
		// setTiles(draggingTiles)
	}

	const onMove = event => {
		const { translationX, translationY } = event
		switch (tile.draggable) {
			case 'up':
				if (translationY >= -size && translationY <= 0) offsetY.value = translationY//changeY//
				break
			case 'down':
				if (translationY <= size && translationY >= 0) offsetY.value = translationY//changeY//
				break
			case 'left':
				if (translationX >= -size && translationX <= 0) offsetX.value = translationX//changeX//
				break
			case 'right':
				if (translationX <= size && translationX >= 0) offsetX.value = translationX//changeX//
				break
			default:
		}
		onTouchMove(event, tile)
	}

	const onEnd = event => {
		onTouchEnd(event, tile)
		// const { translationX, translationY, velocityX, velocityY } = event
		// let updatedTiles = null
		// let moveThreshold = itemSize / 2
		// const moveY = Math.abs(translationY) > moveThreshold
		// const moveX = Math.abs(translationX) > moveThreshold
		// if (
		// 	(velocityY > 1000 || velocityX > 1000)
		// 	||
		// 	(moveX || moveY)
		// ) {
		// 	const nextEmptyPos = { col: tile.col, row: tile.row }
		// 	updatedTiles = tiles.map(t => {
		// 		let newTile = t
		// 		if (t.dragging) {
		// 			newTile.dragging = false
		// 			if (t.draggable === 'up' || t.draggable === 'down') {
		// 				newTile.row = t.draggable === 'up'
		// 					? t.row - 1
		// 					: t.row + 1
		// 			} else {
		// 				newTile.col = t.draggable === 'left'
		// 					? t.col - 1
		// 					: t.col + 1
		// 			}
		// 			newTile.dragging = false
		// 		}
		// 		const direction = getDirectionToEmpty(newTile, nextEmptyPos)
		// 		newTile.draggable = direction
		// 		return newTile
		// 	})
		// 	setEmpty(nextEmptyPos)
		// } else {
		// 	updatedTiles = tiles.map(t => ({ ...t, dragging: false }))
		// }
		// resetOffsetValues()
		// setTiles(updatedTiles)
	}

	const animatedStyles = useAnimatedStyle(() => {
		return {
			transform: [
				{ translateX: offsetX.value },
				{ translateY: offsetY.value },
			]
		}
	})

	// const handleStart = () => {
	// 	onTouchStart(tile)
	// }

	// const handleMove = event => {
	// 	onTouchMove(event, tile)
	// }

	// const handleEnd = e => {
	// 	onTouchEnd(e, tile)
	// }

	const pan = Gesture.Pan()
		.runOnJS(true)
		.onBegin(onTouch)
		.onChange(onMove)
		.onFinalize(onEnd)
	
	return (
		<Animated.View
			{...props}
			style={[
				{
					position: 'absolute',
					top: tile.row * size,
					left: tile.col * size,
					height: size,
					width: size,
					overflow: 'hidden',
					borderRadius: 8,
					backgroundColor: tile.dragging ? getModifiedColor('#b58df1', -25) : tile.draggable ? '#b58df1' : getModifiedColor('#b58df1', 25),
					cursor: tile.dragging ? 'grab' : tile.draggable ? 'pointer' : 'default',
					// transform: [
					// 	{ translateX: props.offsetX },
					// 	{ translateY: props.offsetY },
					// ],
				},
				tile.dragging ? animatedStyles : {},
			]}
		>
			<GestureDetector gesture={pan}>
				<SquareWithLabel label={tile.id + 1} size={size} />
			</GestureDetector>
		</Animated.View>
	)
}