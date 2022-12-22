'use strict'

const repository = require('../repositories/user-repository')
const md5 = require('md5')
const authService = require('../services/auth-service')
const emailService = require('../services/email-service')

exports.get = async (req, res, next) => {
  try {
    var data = await repository.get()
    console.log('user - get - all users')
    res.status(200).send(data)
  } catch (erro) {
    res.status(500).send({
      message: 'Error Request'
    })
  }
}

exports.getById = async (req, res, next) => {
  try {
    let id = req.params.id
    var data = await repository.getById(id)
    console.log(`user - getById - id[${id}]`)
    if (data !== null) {
      res.status(200).send(data);
    } else {
      res.status(404).send({
        message: 'Invalid data'
      })
    }  } catch (e) {
    res.status(500).send({
      message: 'Error Request'+e
    })
  }
}
exports.post = async (req, res, next) => {
  try {
    await repository.create({
      name: req.body.name,
      password: md5(req.body.password + global.SALT_KEY),
      email: req.body.email,
      telefone: req.body.telefone,
      status: req.body.status,
      zipcode: req.body.zipcode,
      address: req.body.address,
      city: req.body.city,
      type: req.body.type,
      state: req.body.state,
    })

    let sendEmail = await emailService.send(
      req.body.email,
      'Welcome to the store',
      "<h1>{0}</h1>".replace('{0}', req.body.name)
    )
    res.status(200).send({
      message: 'Account Created'
    });
    console.log('user - create');
    console.log('User:', req.body);
  } catch (erro) {
    res.status(500).send({
      message: 'Error Request'+erro
    })
  }
}

exports.login = async (req, res, next) => {
  try {
    const user = await repository.login({
      email: req.body.email,
      password: md5(req.body.password + global.SALT_KEY)
    })
    if (!user) {
      console.log('user - auth - not_found'+md5(req.body.password + global.SALT_KEY));
      res.status(404).send({
        message: 'User or Password not valid'+user
      });
    }
    console.log(
        `user - auth - email[${req.body.email}] - password[${req.body.password}]`
      );
    const token = await authService.generateToken({
      email: user.email,
      name: user.name,
    });
    user.token = token;
    console.log("User:", user)
    await repository.put(user.id, user);
    res.status(201).send({
      token: token,
      data: {
        email: user.email,
        name: user.name,
        id: user.id,
        type: user.type
      },
      message: 'Success'
    })
  } catch (erro) {
    res.status(500).send({
      message: 'Error Request'
    })
  }
}

exports.logout = async (req, res, next) => {
  try {
    const user = await repository.getById(req.body.id)
    if (!user) {
      console.log('user - auth - not_found');
      res.status(404).send({
        message: 'User or Password not valid'+user
      });
    }
    user.token = '';
    await repository.put(user.id, user);
    res.status(201).send({
      message: 'Success'
    })
  } catch (erro) {
    res.status(500).send({
      message: 'Error Request'
    })
  }
}

exports.authenticate =  (req, res, next) => {
  try {
    const token = authService.authorize(req, res, next);
    res.status(201).send({
      token: token,
      message: 'Success'
    })
  } catch (erro) {
    res.status(500).send({
      message: 'Error Request'+erro
    })
  }
}

exports.put = async (req, res, next) => {
  try {
    let id = req.params.id;
    let password = md5(req.body.password + global.SALT_KEY)
    req.body.password = password;
    let data = req.body
    await repository.put(id, data)
    res.status(201).send({
      message: 'User updated'+data.password
    });
    console.log(`user - update - id[${id}]`);
    console.log('User:' + req.body);
  } catch (erro) {
    res.status(500).send({
      message: 'Error Request'+erro
    })
  }
}

exports.delete = async (req, res, next) => {
  try {
    let id = req.params.id;
    await repository.del(id);
    res.status(200).send({
      message: 'User removed'
    });
    console.log(`user - delete - id[${id}]`);
  } catch (erro) {
    res.status(500).send({
      message: 'Error Request'
    })
  }
}
