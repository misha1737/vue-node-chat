var mongoose = require('../libs/mongoose');
Schema = mongoose.Schema;

var schema = new Schema({
    login:{
        type: String,
        required: true,
    },
    message:{
        type: String,
        required: true,
    },
    time:{
        type: String,
        required: true,
    }
},

);
 
exports.Message = mongoose.model('message', schema);
