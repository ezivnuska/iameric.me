const mongoose = require('mongoose')
const bcrypt = require('bcrypt')

const Schema = mongoose.Schema

const UserSchema = new Schema({
    password: {
        type: Schema.Types.String,
        required: true
    },
    email: {
        type: Schema.Types.String,
        required: true,
        unique: true
    },
    username: {
        type: Schema.Types.String,
        required: true,
        unique: true
    },
    phone: {
      type: Schema.Types.String,
    },
    bio: {
        type: Schema.Types.String
    },
    profileImage: {
        type: Schema.Types.ObjectId,
        ref: 'UserImage',
    },
    role: {
      type: Schema.Types.String,
      default: 'driver',
    },
    joinDate: {
        type: Date,
        default: Date.now(),
    },
    token: {
        type: Schema.Types.String,
    },
    images: [{
        type: Schema.Types.ObjectId,
        ref: 'UserImage',
    }],
    products: [{
        type: Schema.Types.ObjectId,
        ref: 'Product',
    }],
    location: {
        type: Schema.Types.ObjectId,
        ref: 'Location',
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

const UserModel = mongoose.model('User', UserSchema)

module.exports = UserModel
