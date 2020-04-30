const LoginController = require('./loginController');
const RegisterController = require('./registerController');

const useCases = require('../usecases');

const loginController = new LoginController(useCases.loginUsecase);
const registerController = new RegisterController(useCases.registerUsecase);

module.exports = {
    loginController,
    registerController
}