import express, { Application, Request, Response } from "express";
import cors from "cors";
import { globalErrorHandler } from "./middleware/globalErrorHandler";
import routes from "./routes";

const app: Application = express();
app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(
  cors({
    origin: [
      "https://level-2-24-assignment-9-client.vercel.app",
      "http://localhost:5173",
    ],
    credentials: true,
  })
);

app.get("/", (req: Request, res: Response) => {
  res.send("level-2-24-assignment-9 server...");
});

routes.map((item) => {
  return app.use(`/api/${item.path}`, item.routes);
});

app.use(globalErrorHandler);

export default app;
