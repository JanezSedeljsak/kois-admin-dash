const mongoose = require('mongoose');
const Schema = mongoose.Schema;
//const uniqueValidator = require('mongoose-unique-validator');

let pointSchema = new Schema({
    location: {
        lat: { type: Number },
        lon: { type: Number }
    },
    tabs: [{ 
        title: { type: String },
        images: [{ type: String }],
        description: { type: String }
    }],
    userCreated: { type: String, default: "" },
    userUpdated: { type: String, default: "" },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
}, {
    collection: 'points'
})

module.exports = mongoose.model('Point', pointSchema)

/* kKkimages123 */