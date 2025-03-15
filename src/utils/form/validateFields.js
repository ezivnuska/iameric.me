import { isValidEmail } from '.'

const checkForError = ({ name, value, requirements = undefined }) => {
    const invalid = !value || !value.length
    let error = null

    if (requirements?.length) {
        // console.log('*', requirements)
        let index = 0
        while (index < requirements.length) {
            const requirement = requirements[index]
            // console.log('**', requirement.condition())
            if (!requirement.condition()) {
                return { name, message: requirement.errorMessage }
            }
            index++
        }
    }

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
            if (invalid) {
                error = { name, message: 'Field cannot be blank.' }
            }
            break
        case 'destroy':
            if (invalid) {
                error = { name, message: 'Field cannot be blank.' }
            }
            break
        case 'body':
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
    let error = null
    
    while (index < fields.length) {
        const field = fields[index]
        error = checkForError(field)

        if (error) {
            return { ...error, index }
        } else {
            validFields[field.name] = fields.value
            index++
        }
    }
    return null
}

export default validateFields