class Result {
    message;
    successData;
    constructor(message, data) {
        this.message = message;
        if (data) this.successData = data;
    }
}

const renderResult = (res, statusCode, message, data) => {
    const result = new Result(message, data);
    return res.status(statusCode).send(result);
}

module.exports = { renderResult };