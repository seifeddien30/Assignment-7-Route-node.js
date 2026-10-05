import express, { Router } from "express";
import {
  createNote,
  updateNote,
  replaceNote,
  updateAllNotes,
  deleteNote,
  paginateNotes,
  getNoteById,
  getNoteByContent,
  getNotesWithUser,
  aggregateNotes,
  deleteAllNotes,
} from "./note.service.js";
const router = Router();

router.use(express.json());

router.post("/", async (req, res) => {
  try {
    await createNote(req, res);
  } catch (err) {
    console.log(err);
    res.json({ message: "internal server error" });
  }
});
router.patch("/all", async (req, res) => {
  try {
    await updateAllNotes(req, res);
  } catch (err) {
    console.log(err);
    res.json({ message: "internal server error" });
  }
});
router.patch("/:noteId", async (req, res) => {
  try {
    await updateNote(req, res);
  } catch (err) {
    console.log(err);
    res.json({ message: "internal server error" });
  }
});

router.put("/replace/:noteId", async (req, res) => {
  try {
    await replaceNote(req, res);
  } catch (err) {
    console.log(err);
    res.json({ message: "internal server error" });
  }
});
router.delete("/:noteId", async (req, res) => {
  try {
    await deleteNote(req, res);
  } catch (err) {
    console.log(err);
    res.json({ message: "internal server error" });
  }
});

router.get("/paginate-sort", async (req, res) => {
  try {
    await paginateNotes(req, res);
  } catch (err) {
    console.log(err);
    res.json({ message: "internal server error" });
  }
});
router.get("/note-by-content", async (req, res) => {
  try {
    await getNoteByContent(req, res);
  } catch (err) {
    console.log(err);
    res.json({ message: "internal server error" });
  }
});
router.get("/note-with-user", async (req, res) => {
  try {
    await getNotesWithUser(req, res);
  } catch (err) {
    console.log(err);
    res.json({ message: "internal server error" });
  }
});
router.get("/aggregate", async (req, res) => {
  try {
    await aggregateNotes(req, res);
  } catch (err) {
    console.log(err);
    res.json({ message: "internal server error" });
  }
});

router.get("/:id", async (req, res) => {
  try {
    await getNoteById(req, res);
  } catch (err) {
    console.log(err);
    res.json({ message: "internal server error" });
  }
});

router.delete("/", async (req, res) => {
  try {
    await deleteAllNotes(req, res);
  } catch (err) {
    console.log(err);
    res.json({ message: "internal server error" });
  }
});

export default router;
