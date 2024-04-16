export const getFields = (initialState, data) => {
    let values = initialState
    if (data) {
        const formKeys = Object.keys(values)
        const fields = {}
        formKeys.map(key => {
            const field = data[key]
            if (field && field.length) {
                fields[key] = field
            }
        })
        values = fields
    }
    return values
}