import express from "express";
import { env } from "./src/config/env.service.js";
import { databaseConnection } from "./src/database/connection.js";
import userRouter from "./src/modules/user/user.controller.js";
import noteRouter from "./src/modules/note/note.controller.js";
const app = express();
databaseConnection();
app.use(express.json());

app.use("/users", userRouter);
app.use("/notes", noteRouter);

app.listen(`${env.PORT}`, () => {
  console.log(`Server is running on port ${env.PORT}`);
});
