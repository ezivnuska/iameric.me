const mongoose = require('mongoose')

const Schema = mongoose.Schema

const EntrySchema = new Schema({
    userId: {
        type: String,
        // required: true,
    },
    username: {
        type: String,
        // required: true,
    },
    text: {
        type: String,
        // required: true,
    },
})

// UserSchema.pre('save', function(next) {

//   if(!this.isModified('password')) {
//     return next()
//   }

//   bcrypt.genSalt(10, (err, salt) => {
//     if (err) return next(err)

//     bcrypt.hash(this.password, salt, (err, hash) => {
//       if(err) return next(err)
//       this.password = hash
//       console.log('new user PW hash', hash)

//       next()
//     })
//   })
// })

const EntryModel = mongoose.model('Entry', EntrySchema)

module.exports = EntryModel
