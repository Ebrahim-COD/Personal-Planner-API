const dotenv = require("dotenv");
const morgan = require("morgan");
const cors = require("cors");

dotenv.config();

require("./config/database");
const express = require("express");

// Auth
const verifyToken = require("./middleware/verify-token");

// Controllers
const testJWTRouter = require("./controllers/test-jwt");
const usersRouter = require("./controllers/users");
const profilesRouter = require("./controllers/profiles");
const collectionsRouter = require("./controllers/route/collectionRoute");
const listItemsRouter = require("./controllers/route/listitemRoute");
const notesRouter = require("./controllers/route/notesRoute");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(morgan("dev"));
app.use(express.json());

// Routes auth
app.use("/test-jwt", testJWTRouter);
app.use("/users", usersRouter);
app.use("/profiles", verifyToken, profilesRouter);
app.use(
  "/collections",
  verifyToken,
  collectionsRouter,
  listItemsRouter,
  notesRouter
);

app.listen(PORT, () => {
  console.log("The express app is ready!");
});
