import fs from "fs-extra";
import { fileURLToPath } from "url";
import { dirname, join } from "path";

const { readJSON, writeJSON, writeFile } = fs;

const allData = join(dirname(fileURLToPath(import.meta.url)), "../data");

const mediaFiles = join(
  dirname(fileURLToPath(import.meta.url)),
  "../../public/img/media"
);

export const fetchMedia = async () =>
  await readJSON(join(allData, "media.json"));

export const fetchReviews = async () =>
  await readJSON(join(allData, "reviews.json"));

export const writeMedia = async (content) =>
  await writeJSON(join(allData, "media.json"), content);

export const writeReviews = async (content) =>
  await writeJSON(join(allData, "reviews.json"), content);

export const writeMediaPics = async (fileName, content) =>
  await writeFile(join(mediaFiles, fileName), content);
