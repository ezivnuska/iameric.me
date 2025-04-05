const Bip = require('../../models/Bip')
const BipImage = require('../../models/BipImage')
const removeImageAndThumb = require('./removeImageAndThumb')
const path = require('path')
const { remove } = require('fs-extra')

const assetDir = process.env.IMAGE_PATH || 'assets'

const removeUserAssetsByUsername = async username => {

    const userDir = path.join(assetDir, username)
    console.log('removing user assets at: ', userDir)

    return remove(userDir, err => {
        if (err) console.log('error removing asset directory', err)
        else {
            console.log(`successfully removed asset directory for ${username}`)
            return true
        }
        return false
    })
    
}

module.exports = removeUserAssetsByUsername