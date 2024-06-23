export default getFields = (initialState, data) => {
    if (!data) return initialState
    const initialKeys = Object.keys(initialState)
    const keysAvailable = Object.keys(data)
    let reducedArray = {}
    initialKeys.map(key => {
        const keyRequired = keysAvailable.indexOf(key) > -1
        reducedArray[key] = keyRequired ? data[key] : initialState[key]
    })
    return reducedArray
}