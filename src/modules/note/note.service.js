import { noteModel } from "../../database/model/note.model.js";
import mongoose from "mongoose";

export const createNote = async (req, res) => {
  let { userId } = req.query;
  let { title, content } = req.body;
  const noteData = await noteModel.insertOne({ title, content, userId });
  return res.json({ message: "note created" });
};

export const updateNote = async (req, res) => {
  let { noteId } = req.params;
  let { userId } = req.query;
  let { content, title } = req.body;
  let existedNote = await noteModel.findById(noteId);
  if (existedNote) {
    if (existedNote.userId == userId) {
      title
        ? await noteModel.updateOne({ _id: noteId }, { $set: { title: title } })
        : null;
      content
        ? await noteModel.updateOne(
            { _id: noteId },
            { $set: { content: content } },
          )
        : null;
      let updatednote = await noteModel.findById(noteId);
      return res.json({ message: "done", updatednote });
    } else {
      return res.json({ message: "you are not the owner" });
    }
  } else {
    return res.json({ message: "note not found" });
  }
};

export const replaceNote = async (req, res) => {
  let { noteId } = req.params;
  let { userId } = req.query;
  let data = req.body;

  let existedNote = await noteModel.findById(noteId);

  if (!existedNote) {
    return res.json({ message: "note not found" });
  }

  if (existedNote.userId.toString() != userId) {
    return res.json({ message: "you are not the owner" });
  }

  let result = await noteModel.replaceOne(
    { _id: noteId },
    {
      title: data.title,
      content: data.content,
      userId: existedNote.userId,
    },
  );

  return res.json({
    message: "note replaced successfully",
  });
};

export const updateAllNotes = async (req, res) => {
  let { userId } = req.query;
  let { title } = req.body;

  let r = await noteModel.updateMany(
    { userId: userId },
    { $set: { title: title } },
  );

  return res.json({
    message: "all notes updated successfully",
  });
};

export const deleteNote = async (req, res) => {
  let { noteId } = req.params;
  let { userId } = req.query;

  let existedNote = await noteModel.findById(noteId);

  if (!existedNote) {
    return res.json({ message: "note not found" });
  }

  if (existedNote.userId.toString() != userId) {
    return res.json({ message: "you are not the owner" });
  }

  let deletedNote = await noteModel.findOneAndDelete({
    _id: noteId,
  });

  return res.json({
    message: "note deleted successfully",
  });
};

export const paginateNotes = async (req, res) => {
  let { userId, page, limit } = req.query;

  let notes = await noteModel
    .find({ userId: userId })
    .sort({ createdAt: -1 })
    .skip((page - 1) * limit)
    .limit(limit);

  return res.json({
    notes,
  });
};

export const getNoteById = async (req, res) => {
  let { id } = req.params;
  let { userId } = req.query;

  let note = await noteModel.findById(id);

  if (!note) {
    return res.json({ message: "note not found" });
  }

  if (note.userId.toString() != userId) {
    return res.json({ message: "you are not the owner" });
  }

  return res.json({
    message: "note found",
    note,
  });
};

export const getNoteByContent = async (req, res) => {
  let { content, userId } = req.query;

  let note = await noteModel.findOne({
    content: content,
    userId: userId,
  });

  if (!note) {
    return res.json({ message: "note not found" });
  }

  return res.json({
    message: "note found",
    note,
  });
};

export const getNotesWithUser = async (req, res) => {
  let { userId } = req.query;

  let notes = await noteModel
    .find({ userId: userId })
    .select("title userId createdAt")
    .populate("userId", "email");

  return res.json({
    notes,
  });
};

export const aggregateNotes = async (req, res) => {
  let { userId, title } = req.query;

  let match = {
    userId: new mongoose.Types.ObjectId(userId),
  };

  if (title) {
    match.title = { $regex: title, $options: "i" };
  }

  let notes = await noteModel.aggregate([
    {
      $match: match,
    },
    {
      $lookup: {
        from: "users",
        localField: "userId",
        foreignField: "_id",
        as: "user",
      },
    },
    {
      $unwind: "$user",
    },
    {
      $project: {
        _id: 1,
        title: 1,
        content: 1,
        createdAt: 1,
        user: {
          name: "$user.name",
          email: "$user.email",
        },
      },
    },
  ]);

  return res.json({
    notes,
  });
};

export const deleteAllNotes = async (req, res) => {
  let { userId } = req.query;

  let deletedNotes = await noteModel.deleteMany({
    userId: userId,
  });

  return res.json({
    message: "all notes deleted successfully",
  });
};
