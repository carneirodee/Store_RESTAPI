'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Product = mongoose.model('Product');

const schema = new Schema({
    products:[{
        product: new Product()
    }],
    total:{
        type: Number,
        required: true,
        trim: true
    },
});

module.exports = mongoose.model('Cart', schema);