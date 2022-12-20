'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
    name:{
        type: String,
        required: true,
        trim: true
    },
    password:{
        type: String,
        required: true,
        trim: true
    },
    email:{
        type: String,
        required: true,
        index: { unique: true, sparse: true }
    },
    type:{
        type: String,
        required: true,
        trim: true
    },
    telefone:{
        type: String,
        required: true,
        trim: true
    },
    status:{
        type: Boolean,
        required: true,
        default: true
    },
    zipcode:{
        type: String,
        required: true,
        trim: true
    },
    address:{
        type: String,
        required: true,
        trim: true
    },
    city:{
        type: String,
        required: true,
        trim: true
    },
    state:{
        type: String,
        required: true,
        trim: true
    },
    status: {
        type: Number,
        required: true,
        trim: true
    }
});

module.exports = mongoose.model('User', schema);