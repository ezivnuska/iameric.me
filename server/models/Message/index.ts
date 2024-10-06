const mongoose = require('mongoose')

const Schema = mongoose.Schema

const MessageSchema = new Schema({
    from: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    to: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    // username: {
    //     type: Schema.Types.String,
    //     required: true,
    // },
    text: {
        type: Schema.Types.String,
        required: true,
    },
},
{
    timestamps: true,
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

const MessageModel = mongoose.model('Message', MessageSchema)

module.exports = MessageModel
