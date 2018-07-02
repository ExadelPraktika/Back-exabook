const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const UserSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    name: {
        type: String,
        required: true,
        trim: true
    },
    password: {
        type: String,
        required: true,
    }
});
// authenticate input against data in mongo
UserSchema.statics.authenticate = (email, password, callback) => {
    User.findOne({ email: email})
        .exec((error, user)=>{
            if(error){
                return callback(error);
            } else if(!user){
                const err = new Error('User not found');
                err.status = 401;
                return callback(err);
            }
            bcrypt.compare(password, user.password, (error, result) => {
                if (result === true){
                    return callback(null, user);
                } else {
                    return callback();
                }
            });
        });
};
// hashing password before saving to database
UserSchema.pre('save', function (next){
    const user = this;
    bcrypt.hash(user.password, 10, (err, hash)=>{
        if(err){
            next(err);
        }else{
            user.password = hash;
            next();
        }
    })
});

const User = mongoose.model('User', UserSchema);

module.exports = User;