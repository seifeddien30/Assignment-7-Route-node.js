import express, { Router } from "express";
import {
  signupUser,
  loginUser,
  updateUser,
  deleteUser,
  getUserInfo,
} from "./user.service.js";
const router = Router();

router.use(express.json());
router.post("/signup", async (req, res) => {
  try {
    await signupUser(req, res);
  } catch (err) {
    console.log(err);
    res.json({ message: "internal server error" });
  }
});

router.post("/login", async (req, res) => {
  try {
    await loginUser(req, res);
  } catch (err) {
    console.log(err);
    res.json({ message: "internal server error" });
  }
});

router.patch("/:id", async (req, res) => {
  try {
    await updateUser(req, res);
  } catch (err) {
    console.log(err);
    res.json({ message: "internal server error" });
  }
});

router.delete("/", async (req, res) => {
  try {
    await deleteUser(req, res);
  } catch (err) {
    console.log(err);
    res.json({ message: "internal server error" });
  }
});

router.get("/", async (req, res) => {
  try {
    await getUserInfo(req, res);
  } catch (err) {
    console.log(err);
    res.json({ message: "internal server error" });
  }
});
export default router;
