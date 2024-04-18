// export const getFields = (initialState, data) => {
//     let values = initialState
//     if (data) {
//         const formKeys = Object.keys(values)
//         const fields = {}
//         formKeys.map(key => {
//             const field = data[key]
//             if (field && field.length) {
//                 fields[key] = field
//             }
//         })
//         values = fields
//     }
//     return values
// }

export const getFields = (initialState, data) => {
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

export const validateFields = (fields, validate) => {
    let index = 0
    const keys = Object.keys(fields)
    while (index < keys.length) {
        const key = keys[index]
        const isValid = validate(key)
        if (!isValid) return
        else index++
    }
}