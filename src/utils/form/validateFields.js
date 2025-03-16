import { isValidEmail } from '.'

const checkForError = ({ name, value, requirements = null }) => {
    
    const invalid = !value || !value.length

    let error = null

    if (requirements?.length) {

        let index = 0
        
        while (index < requirements.length) {

            const requirement = requirements[index]
            
            if (!requirement.condition) {
                error = { name, message: requirement.errorMessage }
            }

            index++
        }
    }

    if (!error) {

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
            case 'body':
                if (invalid) {
                    error = { name, message: 'Field cannot be blank.' }
                }
                break
            default:
                console.log('field not found:', name)
        }
    }

    // if (error) console.log('error found', error)

    return error
}

const validateFields = fields => {
    let index = 0
    let error = null
    
    while (index < fields.length) {
        
        const field = fields[index]
        
        error = checkForError(field)

        if (error) {
            return { ...error, index }
        }
        index++
    }
    
    return null
}

export default validateFields