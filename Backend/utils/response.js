const responseMessage = (statusCode, type = null) => {
    let message = "";
    switch (statusCode) {
      case 200:
        type == "fetch"
          ? (message = "Fetched data successfully")
          : (message = `${type ? type : "Request"} completed successfully`);
        break;
      case 201:
        message = "Resource was created successfully";
        break;
  
      case 404:
        message = "Resource not found";
        break;
  
      case 400:
        message = "Bad request, please check the payload";
        break;

      case 401:
        message = "Not Authorized. Please provide valid creandtials"
        break;
  
      case 500:
        message = "Some error occurred, while performing the requested action";
        break;
    }
    return message;
  };
  
  exports.success = (res, status = 200, type = "fetch", data = null) => {
    let responseObj = {
      type: "Success",
      message: responseMessage(status, type),
      data: data,
    };
    return res.status(status).send(responseObj);
  };
  
  exports.error = (res, status = 400, errorMessage) => {
    let responseObj = {
      type: "error",
      message: responseMessage(status),
      errorMessage: errorMessage,
    };
  
    return res.status(status).send(responseObj);
  };