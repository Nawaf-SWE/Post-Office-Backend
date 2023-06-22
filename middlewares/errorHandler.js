const errorHandler = (err, req, res, next) => {
    let error = {...err};
    error.message = err.message;

    // console.log(err);

    res.status(err.statusCode ?? 400).json({
        success: false,
        message: error.message
    })
}

module.exports = errorHandler;