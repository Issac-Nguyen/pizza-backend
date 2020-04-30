const GetAllController = require('./getAllController');
const HistoryController = require('./historyController');
const OrderController = require('./orderController');
const GetFeeController = require('./getFeeController');

const useCases = require('../usecases');

const getAllController = new GetAllController(useCases.getAllUsecase);
const historyController = new HistoryController(useCases.historyUsecase);
const orderController = new OrderController(useCases.newOrderUseCase);
const getFeeController = new GetFeeController(useCases.getFeeUseCase);

module.exports = {
    getAllController,
    historyController,
    orderController,
    getFeeController
}