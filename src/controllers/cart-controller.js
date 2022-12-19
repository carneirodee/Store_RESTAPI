'use strict'

const repository = require('../repositories/cart-repository')
const md5 = require('md5')

exports.get = async (req, res, next) => {
  try {
    var data = await repository.get()
    console.log('cart - get - all carts');
    res.status(200).send(data);
  } catch (erro) {
    res.status(500).send({
      message: 'Error Request'
    })
  }
}

exports.getById = async (req, res, next) => {
  try {
    let id = req.params.id;
    var data = await repository.getById(id);
    console.log(`cart - getById - id[${id}]`);
    res.status(200).send(data);
  } catch (e) {
    res.status(500).send({
      message: 'Error Request'
    })
  }
}

exports.post = async (req, res, next) => {
  try {
    await repository.create({
      name: req.body.name,
      price: req.body.price,
      description: req.body.description,
      qtd: req.body.qtd,
      status: req.body.status
    })
    res.status(201).send({
      message: 'Cart registered'
    });
    console.log('cart - create');
    console.log('Cart:', req.body);
  } catch (erro) {
    res.status(500).send({
      message: 'Error Request'
    })
  }
}

exports.put = async (req, res, next) => {
  try {
    let id = req.params.id;
    await repository.put(id, req.body);
    res.status(201).send({
      message: 'Cart updated'
    });
    console.log(`cart - update - id[${id}]`);
    console.log('Cart:' + req.body);
  } catch (erro) {
    res.status(500).send({
      message: 'Error Request'
    })
  }
}

exports.delete = async (req, res, next) => {
  try {
    let id = req.params.id
    await repository.del(id)
    res.status(200).send({
      message: 'Cart removed'
    });
    console.log(`cart - delete - id[${id}]`)
  } catch (erro) {
    res.status(500).send({
      message: 'Error Request'
    })
  }
}
