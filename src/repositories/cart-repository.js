'use strict'

const mongoose = require('mongoose');
const Cart = mongoose.model('Cart');

exports.get =  async(req, res, next) =>{
    const result = await Cart.find({});
    return result;
};

exports.getById = async(id) =>{
    const result = await Cart
    .findById(id)
    return result;
};

exports.create = async(data) =>{
    var cart = new Cart(data);
    await cart.save();
};

exports.put = async(id, data) =>{
   await Cart
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
    await Cart
        .findOneAndRemove(id);
}