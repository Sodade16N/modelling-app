const mongoose = require('mongoose');

const userSchema =new mongoose.Schema({
    fullName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    profileImage: [{
       type: String,
       required: true
    }],
    catalogs: [{
        type: String,
        required: true 
    }]

});
const userModel = mongoose.model('Users', userSchema);

module.exports = userModel;