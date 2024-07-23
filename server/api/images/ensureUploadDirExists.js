const { mkdir } = require('fs')

const ensureUploadDirExists = dir => {
    try {
        mkdir(dir, { recursive: true }, err => {
            if (err) throw new Error()
            else console.log('Assets directory created successfully')
            return true
        })
    } catch (err) {
        console.error('Error creating assets directory:', err)
        return false
    }
}

module.exports = ensureUploadDirExists