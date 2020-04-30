const Error = require('../errors');
class LoginController {
    constructor(useCase) {
        this.useCase = useCase;
        this.execute = this.execute.bind(this)
    }

    async execute(req, res) {
        const result = await this.useCase.execute(req, res);
        if(result instanceof Error) {
            res.status(result.status).json({
                success: false,
                msg: result.msg
            })
        } else {
            res.status(200).json({
                success: true,
                msg: result.msg,
                data: {...result.object}
            })
        }
    }
}

module.exports = LoginController;