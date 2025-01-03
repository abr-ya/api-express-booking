import express from "express";

import { createRoom, deleteRoom, getRoom, getRooms, updateRoom, bookingRoom } from "../controllers/room.js";
import { verifyAdmin } from "../utils/verifyToken.js";

const router = express.Router();

// GET == open
router.get("/:id", getRoom);

// GET ALL == open
router.get("/", getRooms);

// CREATE
router.post("/:hotelid", verifyAdmin, createRoom);

// UPDATE
router.put("/:id", verifyAdmin, updateRoom);
router.put("/booking/:id", bookingRoom);

// DELETE
router.delete("/:id/:hotelid", verifyAdmin, deleteRoom);

export default router;
