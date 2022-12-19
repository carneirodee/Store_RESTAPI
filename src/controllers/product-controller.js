'use strict'

const repository = require('../repositories/product-repository')
const md5 = require('md5')

exports.get = async (req, res, next) => {
  try {
    var data = await repository.get()
    console.log('product - get - all products');
    res.status(200).send(data);
  } catch (erro) {
    res.status(500).send({
      message: 'Error Request' + erro
    })
  }
}

exports.getById = async (req, res, next) => {
  try {
    let id = req.params.id;
    var data = await repository.getById(id);
    console.log(`product - getById - id[${id}] - data[${data}]`);
    if (data !== null) {
      res.status(200).send(data);
    } else {
      res.status(404).send({
        message: 'Invalid data'
      })
    }
    res.status(200).send(data);
  } catch (erro) {
    res.status(500).send({
      message: 'Error Request' + erro
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
      message: 'Product registered'
    });
    console.log('product - create');
    console.log('Product:', req.body);
  } catch (erro) {
    res.status(500).send({
      message: 'Error Request' + erro
    })
  }
}

exports.put = async (req, res, next) => {
  try {
    let id = req.params.id;
    await repository.put(id, req.body);
    res.status(201).send({
      message: 'Product updated'
    });
    console.log(`product - update - id[${id}]`);
    console.log('Product:' + req.body);
  } catch (erro) {
    res.status(500).send({
      message: 'Error Request' + erro
    })
  }
}

exports.delete = async (req, res, next) => {
  try {
    let id = req.params.id
    await repository.del(id)
    res.status(200).send({
      message: 'Product removed'
    });
    console.log(`product - delete - id[${id}]`)
  } catch (erro) {
    res.status(500).send({
      message: 'Error Request' + erro
    })
  }
}
