export const routeNotFoundHandler = (req, res, next) => {
  if (!req.pathname) {
    res.status(404).send({
      message: `${req.protocol}://${req.hostname}:${process.env.PORT}${req.originalUrl} is not implemented!`,
    });
  } else {
    next();
  }
};

export const errorHandler = (err, req, res, next) => {
  if (err.origin === "multerExt") {
    return res.status(err.statusCode).send({
      success: false,
      message: err.message,
    });
  }

  if (err.field && err.field !== "mediaPic") {
    return res.status(400).send({
      success: false,
      message: `mediaPic expected as field name, you sent ${err.field}`,
    });
  }

  if (err.origin === "mediaValidation") {
    return res
      .status(err.statusCode)
      .send({ success: false, message: err.message, errors: err.errList });
  }

  if (!err.statusCode) {
    return res.status(500).send({
      success: false,
      message: "internal server error",
    });
  }

  res.status(err.statusCode).send({ success: false, message: err.message });
};
