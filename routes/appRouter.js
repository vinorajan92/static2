var express = require('express');
var router = express.Router();
var TeamMember = require('../models/TeamMember');
var Product = require('../models/Product');
var Service = require('../models/Service');
var Client = require('../models/Client');

const APP_NAME = 'Shanmuga Agency'

router.get('/', async (req, res, next) => {
  let products = await Product.find();
  let services = await Service.find();
  let clients = await Client.find();
  res.render('index', {title: APP_NAME, appName:APP_NAME, products, services, clients});
});

router.get('/products', async (req, res, next) => {
  let products = await Product.find({});
  res.render('products', {title: `${APP_NAME} - Products`, appName: APP_NAME, products});
});

router.get('/products/:product', async (req, res, next) => {
  let product = await Product.findOne({productName:req.params.product});
  res.render('product-detail', {title: `${APP_NAME} - ${req.params.product}`, appName: APP_NAME, product});
});

router.get('/services', async(req, res, next) => {
  let services = await Service.find({});
  res.render('services', {title:`${APP_NAME} - Our Services`, appName: APP_NAME, services});
});

router.get('/contact', (req, res, next) => {
  res.render('contact', {title:`${APP_NAME} - Contact us`, appName: APP_NAME});
});

router.get('/about', async (req, res, next) => {
  let members = await TeamMember.find({});
  res.render('about', {title:`${APP_NAME} - About us`, appName: APP_NAME, members});
});

module.exports = router;
