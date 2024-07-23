const getUserFromImageId = require('./getUserFromImageId')

const findAndRemoveImageFromProduct = async imageId => {

    const user = await getUserFromImageId(imageId)
    if (user && user.products) {
        let productFound = false
        const products = user.products.map(product => {
            if (product.image === imageId) {
                productFound = true
                return {
                    ...product,
                    image: null,
                }
            }
            return product
        })

        if (productFound) {
            user.products = products
            await user.save()
        }
    }

    return imageId
}

module.exports = findAndRemoveImageFromProduct