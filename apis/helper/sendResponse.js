//Create new entry response 
const createResponse = (res,data) =>{
    res.status(201);
    res.json({isSucess: true, status: 201, info: data});
}

// Delete response (request , response , status  and message that want to display)
const queryErrorRelatedResponse = (req, res, status, data) => {
    const statusCode = status || 400;
    res.status(statusCode);
    res.json({ isSuccess: false, status: statusCode, message: data });
}


// Send success response (request , response , data that you want to pass)
const successResponse = (res, data) => {
    res.status(200);
    res.json({ isSuccess: true, status: 200, info: data });
}

module.exports = {createResponse, queryErrorRelatedResponse,successResponse}