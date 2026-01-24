import express from "express";
import {
  addToFavourite,
  removeFavouriteFrom,
  getFavourites
} from "../controllers/favourite.controller.js";

const router = express.Router();

router.get("/favorites", getFavourites);
router.post("/favorites", addToFavourite);
router.delete("/favorites", removeFavouriteFrom);

export default router;
