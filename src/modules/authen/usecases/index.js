const LoginUsecase = require('./loginUsecase');
const RegisterUseCase = require('./registerUsecase');

const userRepository = require('../repositories');

const loginUsecase = new LoginUsecase(userRepository.userRepository);
const registerUsecase = new RegisterUseCase(userRepository.userRepository);

module.exports = {
    loginUsecase,
    registerUsecase
}