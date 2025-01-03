import express from "express";
import { verifyAdmin } from "../utils/verifyToken.js";

import {
  createHotel,
  deleteHotel,
  updateHotel,
  getHotels,
  getHotel,
  countByCity,
  countByType,
  getHotelWithRooms,
} from "../controllers/hotel.js";

const router = express.Router();

// GET ALL
router.get("/", getHotels);

// GET COUNT BY
router.get("/countByCity", countByCity);
router.get("/countByType", countByType);

// CREATE
router.post("/", verifyAdmin, createHotel);

// UPDATE
router.put("/:id", verifyAdmin, updateHotel);

// DELETE
router.delete("/:id", verifyAdmin, deleteHotel);

// GET
router.get("/with-rooms/:id", getHotelWithRooms);
router.get("/:id", getHotel);

export default router;
