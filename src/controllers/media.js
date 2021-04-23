import uniqid from "uniqid";
import ErrorResponse from "../utils/errorResponse.js";
import {
  fetchMedia,
  fetchReviews,
  writeMedia,
  writeMediaPics,
} from "../utils/fsUtils.js";
import { extname } from "path";

// @desc    Get all media
// @route   GET /media
export const getMedia = async (req, res, next) => {
  try {
    const media = await fetchMedia();

    res.status(200).send({ data: media });
  } catch (error) {
    next(error);
  }
};

// @desc    Get all media by query
// @route   GET /media?
export const getMediaByQuery = async (req, res, next) => {
  try {
    if (Object.keys(req.query).length > 0) {
      const media = await fetchMedia();
      let output = {};

      for (const key in req.query) {
        const query = key.toLowerCase();
        const value = req.query[query].toLowerCase();

        const found = media.filter((med) => med[query] === value);
        output.push();
      }

      res.status(200).send({ data: output });
    } else {
      next();
    }
  } catch (error) {
    console.log(error);
    next(error);
  }
};

// @desc    add media
// @route   POST /media

export const addMedia = async (req, res, next) => {
  try {
    const media = await fetchMedia();
    const newMedia = {
      ...req.body,
      _id: uniqid(),
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    console.log(media);

    media.push(newMedia);
    await writeMedia(media);
    res.status(201).send({ _id: newMedia._id });
  } catch (error) {
    return next(error);
  }
};

// @desc    modify  media
// @route   PUT /media/:id

export const modifyMedia = async (req, res, next) => {
  try {
    const media = await fetchMedia();
    let modifiedMedia;

    if (media.some((med) => med._id === req.params.id)) {
      const newMedia = media.reduce((acc, cv) => {
        if (cv._id === req.params.id) {
          modifiedMedia = { ...cv, ...req.body, updatedAt: new Date() };
          acc.push(modifiedMedia);
          return acc;
        }
        acc.push(cv);
        return acc;
      }, []);

      await writeMedia(newMedia);
      res.status(200).send({ data: modifiedMedia });
    } else {
      next(new ErrorResponse("Media not found", 404));
    }
  } catch (error) {
    next(error);
  }
};

// @desc    delete media
// @route   DELETE /media/:id

export const deleteMedia = async (req, res, next) => {
  try {
    const media = await fetchMedia();
    if (media.some((prod) => prod._id === req.params.id)) {
      const newMedia = media.filter((prod) => prod._id !== req.params.id);
      res.status(200).send({ message: "media removed" });
      await writeMedia(newMedia);
    } else {
      next(new ErrorResponse("Media not found", 404));
    }
  } catch (error) {
    next(error);
  }
};

// @desc    add image to media
// @route   POST /media/:id/upload
export const uploadMediaPic = async (req, res, next) => {
  try {
    const media = await fetchMedia();
    if (media.some((med) => med._id === req.params.id)) {
      console.log(req.file);
      const { buffer, originalname } = req.file;
      const filename = req.params.id + extname(originalname);
      const imgUrl = `${req.protocol}://${req.get(
        "host"
      )}/img/media/${filename}`;

      const newMedia = media.reduce((acc, cv) => {
        if (cv._id === req.params.id) {
          cv.imgUrl = imgUrl;
          cv.updatedAt = new Date();
          acc.push(cv);
          return acc;
        }
        acc.push(cv);
        return acc;
      }, []);
      await writeMedia(newMedia);
      await writeMediaPics(filename, buffer);
      res.status(200).send({ imgUrl: `${imgUrl}` });
    } else {
      next(new ErrorResponse("Media not found", 404));
    }
  } catch (error) {
    console.log(error);
    next(error);
  }
};

// @desc    get reviews for a media
// @route   GET /media/:id/reviews
export const getMediaReviews = async (req, res, next) => {
  try {
    const media = await fetchMedia();
    if (media.some((med) => med._id === req.params.id)) {
      const reviews = await fetchReviews();
      const mediaReviews = reviews.filter(
        (rev) => rev.elementId === req.params.id
      );
      if (mediaReviews.length === 0) {
        return res.status(200).send({
          success: true,
          message: "no reviews available for that media",
        });
      }
      res.status(200).send({ data: mediaReviews });
    } else {
      next(new ErrorResponse("Media not found", 404));
    }
  } catch (error) {
    console.log(error);
    next(error);
  }
};
