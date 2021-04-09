const moongoose = require('mongoose');

const userSchema = new moongoose.Schema({
    user_id: String,
    user_name: String
})

module.exports = moongoose.model('User', userSchema);