const express = require("express");
const router = express.Router();
const Collection = require("../../models/collection");

// 2024-09-01: The date in YYYY-MM-DD format.
// T: A separator between the date and time.
// 00:00:00: The time in HH:MM:SS format.
// Z: Indicates that the time is in UTC (Coordinated Universal Time)

router.post("/:collectionId/listitems", async (req, res) => {
  try {
    req.body.user = req.user.id;
    const collection = await Collection.findById(req.params.collectionId);
    collection.listItems.push(req.body);
    await collection.save();

    const newCollection = collection.listItems[collection.listItems.length - 1];
    newCollection._doc.user = req.user;
    res.status(201).json(newCollection);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get("/:collectionId/listitems", async (req, res) => {
  try {
    const collection = await Collection.findById(req.params.collectionId);
    res.status(200).json(collection.listItems);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get("/:collectionId/listitems/:listItemId", async (req, res) => {
  try {
    const collection = await Collection.findById(req.params.collectionId);
    const listItem = collection.listItems.id(req.params.listItemId);
    res.status(200).json(listItem);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.put("/:collectionId/listitems/:listItemId", async (req, res) => {
  try {
    const collection = await Collection.findById(req.params.collectionId);
    const listItem = collection.listItems.id(req.params.listItemId);
    listItem.set(req.body);
    await collection.save();
    res.status(200).json(listItem);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.delete("/:collectionId/listitems/:listItemId", async (req, res) => {
  try {
    const collection = await Collection.findById(req.params.collectionId);
    collection.listItems.remove({ _id: req.params.listItemId });
    await collection.save();
    res.status(200).json({ message: "Successfully deleted list item" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
