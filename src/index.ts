/**
 * Required External Modules
 */
import * as dotenv from "dotenv";
import express from "express";
import cors from "cors";
import helmet from "helmet";
import { usersRouter } from "./users/user.router";
import { errorHandler } from "./middleware/error.middleware";
import { notFoundHandler } from "./middleware/not-found.middleware";
import mongoose from "mongoose";

dotenv.config();
/**
 * App Variables
 */

if (!process.env.PORT) {
  process.exit(1);
}

const PORT: number = parseInt(process.env.PORT as string, 10);

const app = express();

/**
 *  App Configuration
 */
mongoose.connect(
  "mongodb+srv://damian:" +
    process.env.DB_PASSWORD +
    "@real-estate.ecgt72w.mongodb.net/?retryWrites=true&w=majority"
);

app.use(helmet());
app.use(cors());
app.use(express.json());
app.use("/api/users", usersRouter);

app.use(errorHandler);
app.use(notFoundHandler);

//public images
app.use("/images", express.static("images"));

/**
 * Server Activation
 */
app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
