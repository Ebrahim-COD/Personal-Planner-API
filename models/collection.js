const { Schema, model } = require("mongoose");

const noteSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const listSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    dueDate: {
      type: Date,
      required: true,
    },
    isComplete: {
      type: Boolean,
      default: false,
    },
    priority: {
      type: String,
      required: true,
      enum: ["low", "medium", "high"],
    },
  },
  { timestamps: true }
);

const collectionSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    listItems: [listSchema],
    notes: [noteSchema],
  },
  { timestamps: true }
);

const Collection = model("Collection", collectionSchema);

module.exports = Collection;
