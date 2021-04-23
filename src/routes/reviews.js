import { Router } from "express";
import {
  getReviews,
  addReview,
  modifyReview,
  deleteReview,
  postReviewOnMediaId,
  getReviewsById,
} from "../controllers/reviews.js";
import { validateReview } from "../middlewares/validation/reviewValidation.js";

const router = Router();

router.route("/").get(getReviews).post(validateReview, addReview);

router
  .route("/:id")
  .get(getReviewsById)
  .put(validateReview, modifyReview)
  .delete(deleteReview);

router.route("/:id/media").post(validateReview, postReviewOnMediaId);

export default router;
