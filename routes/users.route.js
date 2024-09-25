import express from "express";
import { updateUser, deleteUser, getUser } from "../controllers/user.js";
import { verifyUser } from "../utils/verifyToken.js";

const router = express.Router();

//UPDATE
router.put("/:id", verifyUser, updateUser);

//DELETE
router.delete("/:id", verifyUser, deleteUser);

//GET
router.get("/:id", verifyUser, getUser);

router.get("/", (req, res) => {
  res.send("Hello from Users!");
});

export default router;
