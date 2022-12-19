const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const config = require('./config');
const app = express();

mongoose.connect(config.connectionString, {useNewUrlParser: true});

const Product = require('./models/product');
const User = require('./models/user');


const indexRoutes = require('./routes/index-route');
const productsRoutes = require('./routes/product-route');
const usersRoutes = require('./routes/user-route');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false}));

app.use('/', indexRoutes);
app.use('/products', productsRoutes);
app.use('/users', usersRoutes);
app.use('/carts', productsRoutes);


module.exports = app;