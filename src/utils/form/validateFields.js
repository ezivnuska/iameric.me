import { isValidEmail } from '.'

const checkForError = (name, value) => {
    const invalid = !value || !value.length
    let error = null
    switch (name) {
        case 'email':
            if (invalid) {
                return { name, message: 'Email required.' }
            } else if (!isValidEmail(value)) {
                error = { name, message: 'Email invalid.' }
            }
            break
        case 'username':
            if (invalid) {
                error = { name, message: 'Username required.' }
            }
            break
        case 'password':
            if (invalid) {
                error = { name, message: 'Password required.' }
            }
            break
        case 'confirmPassword':
            if (invalid) {
                error = { name, message: 'Please confirm password.' }
            }
            break
        case 'text':
        case 'destroy':
            if (invalid) {
                error = { name, message: 'Field cannot be blank.' }
            }
            break
        default:
            console.log('No field to validate by this name:', name)
    }

    // if (error) console.log('error found', error)

    return error
}

const validateFields = fields => {
    let index = 0
    let validFields = {}
    const keys = Object.keys(fields)
    let error = null

    while (index < keys.length) {
        
        const key = keys[index]
        
        // this is dirty. Fix it.
        if (key === 'confirmPassword' && validFields['password'] !== fields[key]) {
            error = {
                name: key,
                message: 'Passwords do not match.',
            }
        } else {
            error = checkForError(key, fields[key])
        }

        if (error) {
            return { ...error, index }
        } else {
            validFields[key] = fields[key]
            index++
        }
    }
    return null
}

export default validateFields