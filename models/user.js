const mongoose= require('mongoose');
const useSchema = mongoose.Schema({
    name: String,
    email: String,
    username: String,
    password: String
})
const User = mongoose.model("user",useSchema);
module.exports = User   