const validateFields = (fields, validate) => {
    let index = 0
    const keys = Object.keys(fields)
    while (index < keys.length) {
        const key = keys[index]
        const isValid = validate(key)
        if (!isValid) return
        else index++
    }
}

export default validateFields