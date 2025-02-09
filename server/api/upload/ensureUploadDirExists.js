const { ensureDir } = require('fs-extra')

const ensureUploadDirExists = async dir => {
    let response = false
    try {
        await ensureDir(dir, { recursive: true }, err => {
            if (err) throw new Error()
            else {
                console.log('Assets directory created successfully', dir)
                response = true
            }
        })
    } catch (err) {
        console.error('Error creating assets directory:', err)
        response = false
    }

    return response
}

module.exports = ensureUploadDirExists