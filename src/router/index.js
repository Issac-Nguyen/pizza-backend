const express = require('express');
let router = express.Router();
const controllers = require('../modules/authen/controllers');
const pizzaControllers = require('../modules/pizza/controllers');
const withAuth = require('../middleware/withAuth');
  
  router.post('/register', controllers.registerController.execute);
  
  router.post('/login', controllers.loginController.execute)

  router.get('/pizzas', pizzaControllers.getAllController.execute);

  router.post('/order', pizzaControllers.orderController.execute);

  router.post('/fee', pizzaControllers.getFeeController.execute)

  router.get('/history', withAuth, pizzaControllers.historyController.execute);

  module.exports = router;