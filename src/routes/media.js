import { Router } from "express";
import {
  getMedia,
  addMedia,
  modifyMedia,
  deleteMedia,
  uploadMediaPic,
  getMediaReviews,
  getMediaByQuery,
} from "../controllers/media.js";
import {
  // multerValidation,
  validateMedia,
  validateMediaSchema,
} from "../middlewares/validation/mediaValidation.js";
import multerValidation from "../middlewares/validation/multerValidation.js";
const upload = multerValidation();
const router = Router();

router.route("/").get(getMediaByQuery, getMedia).post(validateMedia, addMedia);

// router.route('/:id').put(validateProduct, modifyProduct).delete(deleteProduct);
router.route("/:id").put(validateMediaSchema, modifyMedia).delete(deleteMedia);

router.route("/:id/upload").post(upload, uploadMediaPic);

router.route("/:id/reviews").get(getMediaReviews);

export default router;
