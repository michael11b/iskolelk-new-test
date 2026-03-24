export const sendResponse = (res, statusCode, success, message, data = null) => {
    const responseData = {
        status: success ? 'success' : 'error',
        message,
        ...(data && { data })
    };

    res.status(statusCode).json(responseData);
};
