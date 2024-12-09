import { resolve } from "path";
import { existsSync } from "fs";
import express, { Request, Response, NextFunction } from "express";

import authRouter from "./routes/authRouter";
import bookshelfRouter from "./routes/bookshelfRouter";
import bookSearchRouter from "./routes/bookSearchRouter";
import bookRouter from "./routes/bookRouter";

import fileNotFoundError from "./errors/fileNotFound";

const app = express();

app.use(express.json());

const CLIENT_DIRECTORY = "./client/dist";

// Error handler
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  if (err) {
    console.log(
      "Hey there. There could be a problem with your request or it could be that your instructors didn't write a fool-proof server. Check your request first. If you think it is OK, please copy and paste the stack trace below and send it your instructors."
    );
    console.error(err);
    console.log("\n");
    return res.status(500).send({
      message:
        "This is no fun. An unexpected error occurred that may be server related. Please take a look at the command line output.",
    });
  }
});

/**
 * `npm run build` transform your project into static assets:
 * - index.html
 * - single .js file (or multiple if you use code splitting)
 * - CSS files
 * - image files
 * - favicon
 * - manifest
 * This line "serves" or shares your static files that you created with "npm run build".
 */
app.use(express.static(resolve(CLIENT_DIRECTORY)));

/**
 * APIs
 */
app.use("/api/bookshelf", bookshelfRouter);
app.use("/api/book/search", bookSearchRouter);
app.use("/api/book", bookRouter);
app.use("/api/", authRouter);
app.all("/api/*", fileNotFoundError);

app.get("*", (_, res: Response) => {
  if (existsSync(resolve(CLIENT_DIRECTORY, "index.html"))) {
    /**
     * Routes all other GET requests that are not a part of your API above to your React app, where React Router will handle all other routes
     */
    return res.sendFile(resolve(CLIENT_DIRECTORY, "index.html"));
  }
  const text =
    "Its running!\nTo use the API, please refer to the Project README.md.";
  res.send(text);
});

export default app;
