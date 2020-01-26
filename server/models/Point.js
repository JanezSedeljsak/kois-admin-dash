const mongoose = require('mongoose');
const Schema = mongoose.Schema;
//const uniqueValidator = require('mongoose-unique-validator');

let pointSchema = new Schema({
    location: {
        lat: { type: Number },
        lon: { type: Number }
    },
    tabs: [{ 
        header: { type: String },
        imgs: [{ type: String }],
        description: { type: String }
    }],
    userCreated: Schema.Types.ObjectId,
    userUpdated: Schema.Types.ObjectId,
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
}, {
    collection: 'points'
})

module.exports = mongoose.model('Point', pointSchema)