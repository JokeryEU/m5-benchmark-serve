import { check, checkSchema, validationResult } from "express-validator";
import ErrorResponse from "../../utils/errorResponse.js";
// import multer from "multer";
// import { extname } from "path";

export const validateMedia = [
  check("Title").trim().notEmpty().withMessage("Title cannot be empty"),
  check("Year").trim().notEmpty().withMessage("Year cannot be empty"),
  check("imdbID").trim().notEmpty().withMessage("imdbID cannot be empty"),
  check("Type").trim().notEmpty().withMessage("Type cannot be empty"),
  check("Poster").trim().notEmpty().withMessage("Poster cannot be empty"),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const error = new ErrorResponse(
        `Something went wrong with validation`,
        400,
        "mediaValidation"
      );
      error.errList = errors.errors;
      return next(error);
    }
    next();
  },
];

export const validateMediaSchema = (req, res, next) => {
  const mediaValidationSchema = {
    Title: {
      notEmpty: true,
      errorMessage: "Title cannot be empty",
    },
    Year: {
      notEmpty: true,
      errorMessage: "Year cannot be empty",
    },
    imdbID: {
      notEmpty: true,
      errorMessage: "imdbID cannot be empty",
    },
    Type: {
      notEmpty: true,
      errorMessage: "Type cannot be empty",
    },
    Poster: {
      notEmpty: true,
      errorMessage: "Poster cannot be empty",
    },
  };
  checkSchema(mediaValidationSchema);
  next();
};
