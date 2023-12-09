const notFound = (req, res, next) => {
    res.status(404);
    next(new Error(`Not found - ${req.originalUrl}`));
};

const errorHandler = (err, req, res) => {
    return res.status(res.statusCode === 200 ? 500 : res.statusCode).send({
        message: err.message,
        stack: process.env.NODE_ENV === 'production' ? null : err.stack,
    });
};

module.exports = {
    notFound,
    errorHandler,
};
