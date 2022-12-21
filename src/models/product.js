'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
    name:{
        type: String,
        required: true,
        trim: true
    },
    price:{
        type: Number,
        required: true,
        trim: true
    },
    description:{
        type: String,
        required: true,
        trim: true
    },
    qtd:{
        type: Number,
        required: true,
        default: true
    },
    image: {
        type: String,
        required: false,
        trim: true
    },
    status:{
        type: Number,
        required: true,
        trim: true
    }

});

module.exports = mongoose.model('Product', schema);