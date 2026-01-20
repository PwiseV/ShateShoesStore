import express from "express";
import {
  addToFavourite,
  removeFavouriteFrom,
} from "../controllers/favourite.controller.js";

const router = express.Router();

router.post("/favorites", addToFavourite);
router.delete("/favorites", removeFavouriteFrom);

export default router;
