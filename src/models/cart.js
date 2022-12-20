'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
    products:[{
        type: String,
        required: true,
        trim: true
    }],
    userId: {
        type: String,
        require: true,
        index: { unique: true, sparse: true }
    },
    total:{
        type: Number,
        required: false,
        trim: true
    },
});

module.exports = mongoose.model('Cart', schema);