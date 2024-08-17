const express = require("express");
const router = express.Router();
const Collection = require("../../models/collection");

router.post("/:collectionId/notes", async (req, res) => {
  try {
    req.body.user = req.user.id;
    const collection = await Collection.findById(req.params.collectionId);
    collection.notes.push(req.body);
    await collection.save();

    const newCollection = collection.notes[collection.notes.length - 1];
    newCollection._doc.user = req.user;
    res.status(201).json(newCollection);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get("/:collectionId/notes", async (req, res) => {
  try {
    const collection = await Collection.findById(req.params.collectionId);
    res.status(200).json(collection.notes);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get("/:collectionId/notes/:noteId", async (req, res) => {
  try {
    const collection = await Collection.findById(req.params.collectionId);
    const note = collection.notes.id(req.params.noteId);
    res.status(200).json(note);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.put("/:collectionId/notes/:noteId", async (req, res) => {
  try {
    const collection = await Collection.findById(req.params.collectionId);
    const note = collection.notes.id(req.params.noteId);
    note.set(req.body);
    await collection.save();
    res.status(200).json(note);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.delete("/:collectionId/notes/:noteId", async (req, res) => {
  try {
    const collection = await Collection.findById(req.params.collectionId);
    collection.notes.remove({ _id: req.params.noteId });
    await collection.save();
    res.status(200).json({ message: "Successfully deleted note" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
