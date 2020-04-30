const GetAllUsecase = require('./getAllUsecase');
const HistoryUseCase = require('./historyUsecase');
const NewOrderUseCase = require('./newOrderUsecase');
const GetFeeUseCase = require('./getFeeUsecase');
const db = require('../../../db');

const repositories = require('../repositories');

const getAllUsecase = new GetAllUsecase(repositories.pizzaRepository);
const historyUsecase = new HistoryUseCase(repositories.orderRepository);
const newOrderUseCase = new NewOrderUseCase(repositories.orderRepository, repositories.orderItemRepository, db);
const getFeeUseCase = new GetFeeUseCase();

module.exports = {
    getAllUsecase,
    historyUsecase,
    newOrderUseCase,
    getFeeUseCase
}