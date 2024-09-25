import express from "express";
import { verifyAdmin } from "../utils/verifyToken.js";

import {
  createProduct,
  getProducts,
} from "../controllers/product.js";

const router = express.Router();

// GET ALL
router.get("/", getProducts);

// CREATE
router.post("/", verifyAdmin, createProduct);

// UPDATE
// router.put("/:id", verifyAdmin, updateProduct);

// DELETE
// router.delete("/:id", verifyAdmin, deleteProduct);

// GET
// router.get("/:id", getProduct);

export default router;
