import express from "express";

import {
  createHotel,
  deleteHotel,
  updateHotel,
  getHotels,
  getHotel,
} from "../controllers/hotel.js";

const router = express.Router();

// GET ALL
router.get("/", getHotels);

// CREATE
router.post("/", createHotel);

// UPDATE
router.put("/:id", updateHotel);

// DELETE
router.delete("/:id", deleteHotel);

// GET
router.get("/find/:id", getHotel);

export default router;
