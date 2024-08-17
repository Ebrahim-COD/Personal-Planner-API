const express = require("express");
const router = express.Router();
const Collection = require("../../models/collection");

router.post("/", async (req, res) => {
  try {
    req.body.user = req.user.id;
    const collection = await Collection.create(req.body);
    collection._doc.user = req.user;
    res.status(201).json(collection);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get("/", async (req, res) => {
  try {
    const collections = await Collection.find({})
      .populate("user")
      .sort({ createdAt: "desc" });
    res.status(200).json(collections);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get("/:collectionId", async (req, res) => {
  try {
    const collection = await Collection.findById(
      req.params.collectionId
    ).populate("user");
    res.status(200).json(collection);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.put("/:collectionId", async (req, res) => {
  try {
    const collection = await Collection.findById(req.params.collectionId);
    if (collection.user.toString() !== req.user.id) {
      return res.status(403).json({ error: "Not Authorized" });
    }
    const updatedCollection = await Collection.findByIdAndUpdate(
      req.params.collectionId,
      req.body,
      { new: true }
    );

    updatedCollection._doc.user = req.user;
    res.status(200).json(updatedCollection);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.delete("/:collectionId", async (req, res) => {
  try {
    const collection = await Collection.findById(req.params.collectionId);
    if (!collection.user.equals(req.user.id)) {
      return res.status(403).json({ error: "Not Authorized" });
    }
    const deletedCollection = await Collection.findByIdAndDelete(
      req.params.collectionId
    );
    res.status(200).json(deletedCollection);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
