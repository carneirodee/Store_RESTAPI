'use strict';

'use strict'

const mongoose = require('mongoose');
const User = mongoose.model('User');

exports.get =  async(req, res, next) =>{
    const result = await User.find({});
    return result;
};

exports.getById = async(id) =>{
    const result = await User
    .findById(id);
    return result;
};

exports.create = async(data) =>{
    var user = new User(data);
    await user.save();
};

exports.login = async(data) =>{
    const result = await User.findOne({
        email: data.email,
        password: data.password
    });
    return result;
};

exports.put = async(id, data) =>{
    await User
     .findByIdAndUpdate(id,{
         $set:{
            name: data.name,
            password: data.password,
            email: data.email,
            telefone: data.telefone,
            status: data.status,
            zipcode: data.zipcode,
            address: data.address,
            city: data.city,
            state: data.state,
            token: data.token
         }
     });
 };
 
 exports.del = async (id) =>{
     await User
         .findOneAndRemove(id);
 }