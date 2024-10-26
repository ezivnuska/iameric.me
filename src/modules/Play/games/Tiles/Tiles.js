import 'react-native-gesture-handler'
import React, { useEffect, useMemo, useState } from 'react'
import { View } from 'react-native'
import Animated, {
	useAnimatedStyle,
	useSharedValue,
} from 'react-native-reanimated'
import {
	Gesture,
	GestureDetector,
	GestureHandlerRootView,
} from 'react-native-gesture-handler'
import {
	GameHeader,
	Tile,
} from './components'
import { usePlay } from '@play'

export default ({ gameSize }) => {

	const [level, setLevel] = useState(4)
	const {
		tiles,
		setTiles,
	} = usePlay()
	
	const [initialTiles, setInitialTiles] = useState(null)
	const [currentTiles, setCurrentTiles] = useState(tiles || initialTiles)
	const [gameStatus, setGameStatus] = useState('start')

	useEffect(() => {
		if (currentTiles) setTiles(currentTiles)
	}, [currentTiles])

	useEffect(() => {
		if (initialTiles) setTiles(initialTiles)
	}, [initialTiles])

	const createInitialTiles = async () => {
		const tileArray = []
		while (tileArray.length < level * level - 1) {
			const col = tileArray.length % level
			const row = Math.floor(tileArray.length / level)
			let newTile = {
				id: tileArray.length,
				col,
				row,
				direction: null,
				dragging: false,
			}
			tileArray.push(newTile)
		}
		setInitialTiles(tileArray)
	}

	useEffect(() => {
		if (gameSize) createInitialTiles()
	}, [gameSize])

	const handleWin = () => {
		if ((gameStatus === 'playing' || gameStatus === 'dev')) setGameStatus('resolved')
	}

	return (
		<View style={{ flex: 1, justifyContent: 'flex-start', gap: 10 }}>
			
			<GameHeader
				status={gameStatus}
				onChangeStatus={setGameStatus}
			/>

			{initialTiles && (
				<TileGame
					initialTiles={initialTiles}
					// tiles={tiles}
					status={gameStatus}
					handleWin={handleWin}
					gameSize={gameSize}
				/>
			)}

		</View>
	)
}

const TileGame = ({ gameSize, initialTiles, status, handleWin, level = 4  }) => {

	const {
		// gameSize,
		// initialTiles,
		ticks,
		tiles,
		setTiles,
	} = usePlay()
	
	const itemSize = gameSize / level
	const initialEmptyPos = {
		col: level - 1,
		row: level - 1,
	}

	const [emptyCol, setEmptyCol] = useState(initialEmptyPos.col)
	const [emptyRow, setEmptyRow] = useState(initialEmptyPos.row)
	const [refreshing, setRefreshing] = useState(false)
	const [isPaused, setIsPaused] = useState(false)

	useEffect(() => {
		// console.log('status', status)
		switch (status) {
			case 'start':
				if (isPaused) setIsPaused(false)
				setTiles(initialTiles)
				setEmptyPos()
				break
			case 'dev':
				if (isPaused) setIsPaused(false)
				else startDevGame()
				break
			case 'playing':
				if (isPaused) setIsPaused(false)
				else startGame()
				break
			case 'paused':
				setIsPaused(true)
				break
			case 'resolved':
				setTiles(initialTiles.map(t => ({ ...t, dragging: false, direction: null })))
				setEmptyPos()
				break
			default:
		}
	}, [status])

	const refreshTiles = tileArray => {
		setRefreshing(true)
		setTiles(tileArray)
	}
	
	const startDevGame = () => {
        const shuffledTiles = shuffleForDev(initialTiles)
		refreshTiles(shuffledTiles)
		setEmptyCol(initialEmptyPos.col - 1)
	}

	const startGame = () => {
		const shuffledTiles = shuffle(initialTiles)
		refreshTiles(shuffledTiles)
		setEmptyPos()
	}
	
	const offsetX = useSharedValue(0)
	const offsetY = useSharedValue(0)

	const resetOffsetValues = () => {
		offsetX.value = 0
		offsetY.value = 0
	}

	useEffect(() => {
		setTiles(initialTiles)
	}, [])

	useEffect(() => {
		if (refreshing) {
			setRefreshing(false)
			const refreshedTiles = tiles.map(t => {
				const direction = getDirection(t)
				return {
					...t,
					direction,
					dragging: false,
				}
			})
			setTiles(refreshedTiles)
		}
	}, [refreshing, tiles])

	useEffect(() => {
		if (status === 'playing' || status === 'dev') {
			const isCorrect = resolveTiles(tiles)
			if (isCorrect) {
				console.log('WINNER WINNER CHICKEN DINNER')
				// setTiles(initialTiles)
				handleWin()
			}
		}
	},  [emptyCol, emptyRow])

	const getDirection = tile => {
		let direction = null
		
		if (tile.col === emptyCol) {
			direction = (tile.row < emptyRow) ? 'down' : 'up'
		} else if (tile.row === emptyRow) {
			direction = (tile.col < emptyCol) ? 'right' : 'left'
		}
		return direction
	}

	const stopDrag = () => {
		const stoppedTiles = tiles.map(t => ({ ...t, dragging: false }))
		refreshTiles(stoppedTiles)
	}

	const setDraggingTiles = (tile = null) => {
		if (!tile) {
			stopDrag()
			return
		}

		const { row, col } = tile
		let updatedTiles = tiles.map(t => {
			let dragging = false
			if (t.id === tile.id) {
				dragging = true
			} else if (t.col === emptyCol || t.row === emptyRow) {
				const direction = getDirection(t)
				switch (direction) {
					case 'up':
						if (t.row > emptyRow && t.row < row) dragging = true
						break
					case 'down':
						if (t.row < emptyRow && t.row > row) dragging = true
						break
					case 'left':
						if (t.col > emptyCol && t.col < col) dragging = true
						break
					case 'right':
						if (t.col < emptyCol && t.col > col) dragging = true
						break
					default:
				}
			}

			return {
				...t,
				dragging,
			}
		})
		setTiles(updatedTiles)
	}

	const shuffleForDev = () => tiles.map(t => {
		let newTile = t
		if (t.col === 2 && t.row === 3) {
			newTile = {
				...newTile,
				col: 3,
			}
		}
		return newTile
	})

	const shuffle = () => {
		
		let pile = tiles.slice()
		let col = 0
		let row = 0
		let shuffled = []
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

			shuffled.push(shuffledTile)
		}
		return shuffled
		
    }

	const onTouchStart = tile => {
		if (isPaused) return
		if (tile.direction) {
			setDraggingTiles(tile)
		}
	}

	const onTouchMove = (event, tile) => {
		if (isPaused) return
		const { translationX, translationY } = event
		switch (tile.direction) {
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

	const getSwipeEvent = event => {
		const { velocityX, velocityY } = event
		let swipeX = false
		let swipeY = false
		if (velocityY > 1000) swipeY = true
		else if (velocityX > 1000) swipeX = true
		if (swipeX) return 'horizontal'
		else if (swipeY) return 'vertical'
		else return null
	}

	const shouldFinishMove = (event, tile) => {
		const { translationX, translationY } = event
		const swipe = getSwipeEvent(event)
		const moveThreshold = itemSize / 2
		const moveY = Math.abs(translationY) > moveThreshold
		const moveX = Math.abs(translationX) > moveThreshold
		if (swipe) {
			if (swipe === 'horizontal' && moveX) return true
			else if (swipe === 'vertical' && moveY) return true
		}
		const isVertical = (tile.direction === 'up' || tile.direction === 'down')
		return ((!isVertical && moveX) || (isVertical && moveY))
	}

	const onTouchEnd = (event, tile) => {
		if (isPaused) return
		let finishMove = shouldFinishMove(event, tile)
		// console.log('finishing move', finishMove)
		if (finishMove) {
			handleFinishMove(tile)
		} else {
			// setRefreshing(true)
			stopDrag()

			// setTiles(tiles.map(t => ({ ...t, dragging: false })))
		}
		resetOffsetValues()
	}

	const moveTilesUp = () => tiles.map(t => ({
		...t,
		row: t.dragging ? t.row - 1 : t.row,
	}))

	const moveTilesDown = () => tiles.map(t => ({
		...t,
		row: t.dragging ? t.row + 1 : t.row,
	}))

	const moveTilesLeft = () => tiles.map(t => ({
		...t,
		col: t.dragging ? t.col - 1 : t.col,
	}))

	const moveTilesRight = () => tiles.map(t => ({
		...t,
		col: t.dragging ? t.col + 1 : t.col,
	}))

	const setEmptyPos = (pos = null) => {
		const { col, row } = pos || initialEmptyPos
		if (col) setEmptyCol(col)
		if (row) setEmptyRow(row)
	}

	const moveTiles = direction => {

		let tiles = null
		
		switch (direction) {
			case 'up':
				tiles = moveTilesUp()
				break
			case 'down':
				tiles = moveTilesDown()
				break
			case 'left':
				tiles = moveTilesLeft()
				break
			case 'right':
				tiles = moveTilesRight()
				break
			default:
		}
		return tiles
	}
	
	const handleFinishMove = tile => {
		
		const { col, row } = tile
		const movedTiles = moveTiles(tile.direction)
		refreshTiles(movedTiles)
		setEmptyPos({ col, row })
	}

	const getTileByColRow = (tilesToSort, col, row) => {
		return tilesToSort.filter(t => t.col === col && t.row === row)[0]
	}
	
	const resolveTiles = tileArray => {

		let numCorrect = 0
		let row = 0
		let col = 0
		let sorting = true
		let isCorrect = false

		while (sorting) {
			const tile = getTileByColRow(tileArray, col, row)
			if (tile && tile.id === numCorrect) {
				numCorrect++
				// console.log(tile.id, tile.col, tile.row)
				if (numCorrect === tileArray.length) {
					isCorrect = true
				} else {
					if (col + 1 < level) {
						col++
					} else if (row + 1 < level) {
						col = 0
						row++
					}
				}
			} else {
				sorting = false
			}
		}
		
		// console.log('tiles.resolved', isCorrect)
		return isCorrect
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

	const renderTiles = tiles => {
		return tiles.map(t => {

			const pan = Gesture.Pan()
				.runOnJS(true)
				.onBegin(() => onTouchStart(t))
				.onChange(e => onTouchMove(e, t))
				.onFinalize(e => onTouchEnd(e, t))

			return (
				<AnimatedView
					key={`tile-${t.id}`}
					tile={t}
					size={itemSize}
					pan={pan}
					style={t.dragging ? animatedStyles : {}}
				/>
			)
		})
	}

	return (
		<GestureHandlerRootView>
			<View
				style={{
					width: gameSize,
					height: gameSize,
					position: 'relative',
				}}
			>
				{!refreshing && renderTiles(tiles)}
			</View>
		</GestureHandlerRootView>
	)
}

const AnimatedView = ({ tile, size, pan, style, ...props }) => {
	
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
					cursor: tile.direction ? 'pointer' : tile.dragging ? 'grab' : 'default',
				},
				style,
			]}
		>
			<GestureDetector gesture={pan}>
				<Tile
					label={tile.id + 1}
					size={size}
					dragging={tile.dragging}
					direction={tile.direction}
				/>
			</GestureDetector>
			
		</Animated.View>
	)
}