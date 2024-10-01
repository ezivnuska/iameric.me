import React, { useEffect, useMemo, useRef, useState } from 'react'
import { View } from 'react-native'
import { Draggable } from '@components'


const DraggableItem = ({ index, size, posX, posY, dragging, ...props }) => {
    const ref = useRef(null)
    const coords = useRef({
        startX: 0,
        startY: 0,
    })

    // const handleTouch = () => {
    //     onTouch(ref)
    // }

    useEffect(() => {
        ref.current = {
            index,
            startX: posX,
            startY: posY,
            posX,
            posY,
        }
        console.log('init', ref)
    }, [])

    const handleDrag = e => {
        if (!dragging) return
        console.log('')
        console.log(e)
        const { index, offsetX, offsetY, startX, startY } = ref.current
        const x = offsetX
        const y = offsetY
        const posX = x - ref.current.startX
        const posY = y - ref.current.startY
        console.log('CURRENT', ref.current)
        ref.current = {
            index,
            startX,
            startY,
            posX,
            posY,
        }
        props.onMove(e, ref)
    }

    const handleTouch = e => {
        const { index, startY, startX, posX, posY } = ref.current
        const offsetX = e.nativeEvent.offsetX
        const offsetY = e.nativeEvent.offsetY
        console.log('touch offset x', offsetX)
        console.log('touch offset y', offsetY)
        console.log('posX', posX)
        console.log('posY', posY)
        ref.current = {
            index,
            startX,
            startY,
            offsetX,
            offsetY,
            posX,
            posY,
        }
        console.log('touched', ref)
        // props.onTouch(e, ref)
    }

    const onMouseDown = e => {
        console.log(e)
        console.log(ref.current)
        console.log('coords', e.pageX, e.pageY)
        coords.current = {
            startX: e.pageX,
            startY: e.pageY,
        }
        const { offsetX, offsetY } = e.nativeEvent
        console.log('')
        console.log(offsetX, offsetY)
        console.log('')
        ref.current = {
            ...ref.current,
            offsetX,
            offsetY,
        }
        props.onTouch(e, ref)
    }

    const onDrag = e => {
        if (!dragging) return
        console.log('KKKKKK', ref)

        const x = e.pageX - ref.current.startX
        const y = e.pageY - ref.current.startY
        let { posX, posY } = ref.current
        console.log('e-->', e)
        // console.log(posX, posY)
        const { offsetX, offsetY } = e.nativeEvent
        const newPosX = posX + e.nativeEvent.movementX
        const newPosY = posY + e.nativeEvent.movementY
        // const posY = offsetY
        // const posX = e.pageX - e.nativeEvent.target.offsetParent.clientLeft
        // const posY = e.pageY - e.nativeEvent.target.offsetParent.clientTop
        console.log('')
        console.log(offsetX, offsetY)
        // ref.current.posX =- offsetX {
        //     posX: offsetX - posX,
        //     posY: offsetY - posY,
        // }
        ref.current = { ...ref.current, posX: newPosX, posY: newPosY }
    }

    return (
        <View
            {...props}
            ref={ref}
            onMouseDown={onMouseDown}
            onMouseMove={onDrag}
            // onMouseUp={() => setDraggableIndex(null)}
        >
            <View
                style={{
                    position: 'absolute',
                    top: ref.current?.posY,
                    left: ref.current?.posX,
                    height: size.height,
                    width: size.width,
                    backgroundColor: dragging ? 'green' : 'red',
                }}
            />
        </View>
        
    )
}

export default () => {

    const numItems = 3

    const itemDims = {
        width: 100,
        height: 100,
    }
    
    const [items, setItems] = useState([])

    const [ draggableIndex, setDraggableIndex ] = useState(null)
    const [ isMouseDown, setIsMouseDown ] = useState(false)
    const [ dragRef, setDragRef ] = useState(null)
    
    const gameRef = useRef(null)
    const coords = useRef({
        mouseX: 0,
        mouseY: 0,
    })
    // const dragRef = useRef({
    //     posX: 0,
    //     posY: 0,
    // })

    const updatePos = (index, posX, posY) => {
        const updatedItems = items.map(item => {
            if (index === item.index) {
                return {
                    ...item.index,
                    posX,
                    posY,
                }
            } else return item
        })
        setItems(updatedItems)
    }

    // const dragged = useMemo(() => gameRef.current, [gameRef.current])

    // useEffect(() => {
    //     console.log('dragged', dragged)
    // }, [dragged])

    const initItems = () => {
        let array = []
        while (array.length < numItems) {
            const index = array.length
            const posX = itemDims.width * array.length
            const posY = itemDims.height * array.length
            const newItem = { index, posX, posY }
            array.push(newItem)
        }
        setItems(array)
    }

    useEffect(() => {
        // console.log('current', gameRef.current)
        initItems()
    }, [])

    // useEffect(() => {
    //     console.log('items', items)
    // }, [items])

    useEffect(() => {
        if (draggableIndex >= 0) console.log('draggableIndex', draggableIndex)
    }, [draggableIndex])

    // const onMove = ref => {
    //     console.log('ref', ref)
    // }

    const onTouch = (e, ref) => {
        setIsMouseDown(true)
        // coords.current = {
        //     mouseX: ref.current.posX + ref.current.offsetX,
        //     mouseY: ref.current.posY - ref.current.offsetY,
        // }
        // console.log('coords', coords)
        console.log('touched...', ref)
        console.log('')
        setDraggableIndex(ref.current.index)
        const offsetX = e.offsetX
        const offsetY = e.offsetY
        console.log('ref touched', ref.current, ref.current.offsetTop)
        const { index, startX, startY } = ref.current
        const posX =- offsetX
        const posY =- offsetY
        ref.current = {
            index,
            startX,
            startY,
            offsetX,
            offsetY,
            posX,
            posY,
        }
        console.log('current')
        console.log(ref.current)
        console.log('')
    }

    // const onDragStart = ref => {
    //     console.log('starting drag', ref.current)
    //     // dragged.startX = dragged.posX
    //     // dragged.startY = dragged.posY
    //     // console.log('e', e.nativeEvent)
    //     const startX = e.offsetLeft
    //     const startY = e.offsetTop
    //     const offsetX = e.nativeEvent.target.offsetLeft
    //     const offsetY = e.nativeEvent.target.offsetTop
    //     // const targetW = e.nativeEvent.target.clientWidth
    //     // console.log('touch', touchX, touchY, targetW)
    //     // const posX = touchX - e.nativeEvent.offsetLeft
    //     // const posY = touchY - e.nativeEvent.offsetTop
    //     console.log('start', startX, startY)
    //     gameRef.current[draggableIndex] = {
    //         ...dragged,
    //         offsetX,
    //         offsetY,
    //         startX,
    //         startY,
    //         posX,
    //         posY,
    //     }
    //     setIsMouseDown(true)
    //     document.body.style.cursor = 'grabbing'
    // }

    const onDragEnd = () => {
        setIsMouseDown(false)
        setDraggableIndex(null)
        // if (!gameRef.current) return
        document.body.style.cursor = 'default'
    }

    const onDrag = (e) => {
        if (!isMouseDown) return
        console.log('dragging...', e.nativeEvent)

    }

    const onMove = (e, ref) => {
        // if (!isMouseDown || !draggableIndex) return
        if (!isMouseDown) return

        const { startX, startY, offsetX, offsetY } = ref.current
        console.log('offsetX', offsetX)
        console.log('offsetY', offsetY)
        const posX = startX - offsetX
        const posY = startY - offsetY
        console.log('x', posX)
        console.log('y', posY)
        // e.preventDefault()
        // console.log('dragging', draggableIndex)
        // const dragged = gameRef.current[draggableIndex]
        // console.log('', draggableIndex)
        // console.log('dragged', dragged)

        // const posX = ref.current.startX - ref.current.offsetLeft
        // const posY = ref.current.startY - ref.current.offsetTop
        // const targetW = ref.current.clientWidth
        // console.log('touch', posX, posY, targetW)
        // // console.log('start', startX, startY)
        // gameRef.current[draggableIndex] = {
        //     ...ref.current[draggableIndex],
        //     posX,
        //     posY,
        // }
        // console.log('draggable', draggable.offsetLeft)
        // const x = e.pageX - draggable.offsetLeft
        // const y = e.pageY - draggable.offsetTop
        // // // console.log(x, y)
        // const posX = x// - gameRef.current.startX
        // const posY = y// - gameRef.current.startY
        // // // console.log(posX, posY)
        // // gameRef.current = {
        // //     // ...dragRef.current,
        // //     posX,
        // //     posY,
        // // }
        console.log('currentRef', currentRef)
        // const { index, posX, posY } = currentRef
        updatePos(index, posX, posY)
    }

    const colors = ['red, green, blue']

    return (
        <View
            // ref={gameRef}
            // onMouseDown={onDragStart}
            // onMouseMove={onDrag}
            onMouseUp={onDragEnd}
            style={{
                flex: 1,
                width: '100%',
                position: 'relative',
                borderWidth: 1,
            }}
        >
            {items.map(item => {
                const dragging = draggableIndex === item.index
                return (
                    <DraggableItem
                        key={`item-${item.index}`}
                        index={item.index}
                        size={itemDims}
                        posX={item.posX}
                        posY={item.posY}
                        dragging={dragging}
                        // onMove={onMove}
                        // onTouch={handleTouch}
                        // onTouch={setDragRef}
                        // onMouseDown={() => {
                        onTouch={onTouch}
                        // onMouseUp={() => setDraggableIndex(null)}
                    />
                    // <View
                    //     ref={draggable ? dragRef : null}
                    //     key={`item-${item.index}`}
                    //     onMouseDown={() => setDraggableIndex(item.index)}
                    //     onMouseUp={() => setDraggableIndex(null)}
                    //     style={{
                    //         position: 'absolute',
                    //         top: item.posY,
                    //         left: item.posX,
                    //         height: itemDims.height,
                    //         width: itemDims.width,
                    //         backgroundColor: draggable ? 'green' : 'red',//colors[item.index],
                    //     }}
                    // />
                )
            })}
        </View>
    )

    return (
        <View
            // ref={gameRef}
            onMouseDown={onDragStart}
            onMouseMove={onDrag}
            onMouseUp={onDragEnd}
            style={{
                flex: 1,
                width: '100%',
                borderWidth: 1,
                position: 'relative',
            }}
        >
            <View
                dragRef={dragRef}
                style={{
                    position: 'absolute',
                    top: dragRef.current.posY,
                    left: dragRef.current.posX,
                    width: 100,
                    height: 100,
                    backgroundColor: 'teal',
                    borderWidth: 1,
                }}
            />
        </View>
    )
}