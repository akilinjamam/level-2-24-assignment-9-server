import express, { Application, Request, Response } from "express";
import cors from "cors";
import { globalErrorHandler } from "./middleware/globalErrorHandler";
import routes from "./routes";

const app: Application = express();
app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req: Request, res: Response) => {
  res.send("Library Management System server...");
});

app.use("/api/", routes);

app.use(globalErrorHandler);

export default app;
