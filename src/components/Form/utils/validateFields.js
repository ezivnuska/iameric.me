const validateFields = fields => {
    let index = 0
    const keys = Object.keys(fields)
    while (index < keys.length) {
        const key = keys[index]
        const isValid = fields[key]?.length
        if (!isValid) return { name: key, index }
        else index++
    }
    return null
}

export default validateFields