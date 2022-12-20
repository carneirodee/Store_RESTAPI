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
            products: data.products, 
            total: data.total,
            userId: data.userId    
        }
    });
};
exports.getByUserId = async(userId) =>{
    const result = await Cart.find({userId});
    return result;
 };

exports.del = async (id) =>{
    await Cart
        .findOneAndRemove(id);
}