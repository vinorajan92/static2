var express = require('express');
var router = express.Router();
const APP_NAME = 'Shanmuga Agency'

const APP_PRODUCTS = [
  {name: 'Product1'},
  {name: 'Product2'},
  {name: 'Product3'},
  {name: 'Product4'},
  {name: 'Product5'},
  {name: 'Product6'},
  {name: 'Product7'},
  {name: 'Product8'},
  {name: 'Product9'}
];

const CLIENTS = [
  {name: 'Jon doe1', message:'Very Interesting1'},
  {name: 'Jon doe2', message:'Very Interesting2'},
  {name: 'Jon doe3', message:'Very Interesting3'},
  {name: 'Jon doe4', message:'Very Interesting4'}
];

const TEAM_MEMBER = [
  {name:'Member1', message:'', role: 'Chief Executive Officer'},
  {name:'Member2', message:'', role: 'Vice president'},
  {name:'Member3', message:'', role: 'Support Executive'},
]

const APP_SERVICES = [
  {type:'Affordable', message:'We deliver etc etc'},
  {type:'Best Quality', message:'We deliver etc etc'},
  {type:'Free Delivery', message:'We deliver etc etc'},
  {type:'Service 4', message:'We deliver etc etc'},
  {type:'Service 5', message:'We deliver etc etc'},
  {type:'Service 6', message:'We deliver etc etc'}
]

router.get('/', function(req, res, next) {
  res.render('index', {title: APP_NAME, appName:APP_NAME, products: APP_PRODUCTS, clients:CLIENTS, services: APP_SERVICES});
});

router.get('/products', function(req, res, next) {
  res.render('products', {title: `${APP_NAME} - Products`, appName: APP_NAME, products: APP_PRODUCTS});
});

router.get('/products/:product', function(req, res, next) {
  res.render('product-detail', {title: `${APP_NAME} - ${req.params.product}`, appName: APP_NAME});
});

router.get('/services', function(req, res, next) {
  res.render('services', {title:`${APP_NAME} - Our Services`, appName: APP_NAME, services: APP_SERVICES});
});

router.get('/contact', function(req, res, next) {
  res.render('contact', {title:`${APP_NAME} - Contact us`, appName: APP_NAME});
});

router.get('/about', function(req, res, next) {
  res.render('about', {title:`${APP_NAME} - About us`, appName: APP_NAME, members:TEAM_MEMBER});
});

module.exports = router;
