'use strict'

const mongoose = require('mongoose');
const Product = mongoose.model('Product');

exports.get =  async(req, res, next) =>{
    const result = await Product.find({});
    return result;
};

exports.getById = async(id) =>{
    const result = await Product
    .findById(id)
    return result;
};

exports.create = async(data) =>{
    var product = new Product(data);
    await product.save();
};

exports.put = async(id, data) =>{
   await Product
    .findByIdAndUpdate(id,{
        $set:{
            name: data.name,
            price: data.price,
            description: data.description,
            qtd: data.qtd,
            status: data.status       
        }
    });
};

exports.del = async (id) =>{
    await Product
        .findOneAndRemove(id);
}